import { Button, Col, Container, Modal, Row, Stack } from "react-bootstrap";
import { HomeBoard } from "../components/HomeBoard";
import '../App.css'
import { useCallback, useEffect, useState } from "react";
import socket from "../socket/socket";
import { VoiceControl } from "../components/VoiceControl";
import { Chess } from "chess.js";
import { getPieceFromPosition } from "../utils/chessUtils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export function Home({ voiceControl, setVoiceControl }) {
  const [searchingGame, setSearchingGame] = useState(false);
  const [showBoard, setshowBoard] = useState(false);
  const [chooseModeModal, setChooseModeModal] = useState(false);

  const [game, setGame] = useState(new Chess());
  const [kingInCheckSquare, setKingInCheckSquare] = useState({});

  const { t } = useTranslation();
  const navigate = useNavigate();

  const doMove = useCallback((from, to, promotion) => {
    const gameCopy = { ...game };
    const move = gameCopy.move({ from, to, promotion });
    if (move) {
      setGame(gameCopy);

      if (gameCopy.in_check())
        setKingInCheckSquare({
          [getPieceFromPosition(game, { type: 'k', color: game.turn() })]: {
            boxShadow: '0 0 15px 8px rgb(153, 0, 0) inset'
          }
        })
      else
        setKingInCheckSquare({})


    }
    return move;
  }, [game])

  useEffect(() => {
    setshowBoard(true)
    return () => {
      socket.emit('cancelSearch')
    }
  }, []);


  function handleChooseMode() {
    setChooseModeModal(true)
  }

  function handleSearchGame(mode) {
    setChooseModeModal(false)
    setSearchingGame(true)
    socket.emit('searchGame', mode)
  }

  return (
    <>
      <Container className='p-4 mt-5' >
        <Row>
          <Col xs={12} md={3}>
            <Stack className="mx-auto">
              <Button onClick={() => navigate('/game')} size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>{t("Home.singleplayer")}</Button>
              <Button disabled={searchingGame} onClick={handleChooseMode} size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant='' >{t("Home.multiplayer")}</Button>
              {searchingGame && <p className='ms-md-2 mb-2 mb-md-4 fs-5 text-white'>{t("Home.searchingGame")}</p>}
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>{t("Home.friends")}</Button>
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>{t("Home.changeStyles")}</Button>
            </Stack>
            <VoiceControl doMove={doMove} yourTurn={true} voiceControl={voiceControl} setVoiceControl={setVoiceControl} />
          </Col>
          <Col className="mt-3 mt-md-0" xs={12} md={9}>
            {showBoard &&
              <HomeBoard props={{ game, doMove, setKingInCheckSquare, kingInCheckSquare }} />}
          </Col>
        </Row>
      </Container>

      <Modal show={chooseModeModal} onHide={() => setChooseModeModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("Home.chooseMode")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={() => handleSearchGame('bullet')} size='lg' className='me-2 mb-2 py-3' >Bullet (1min)</Button>
          <Button onClick={() => handleSearchGame('blitz')} size='lg' className='me-2 mb-2 py-3' >Blitz (3min)</Button>
          <Button onClick={() => handleSearchGame('rapid')} size='lg' className='me-2 mb-2 py-3' >Rapid (10min)</Button>
          <Button onClick={() => handleSearchGame('classic')} size='lg' className='mb-2 py-3'  >Classic (30min)</Button>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

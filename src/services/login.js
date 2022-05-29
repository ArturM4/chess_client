import axios from 'axios'

const url = "http://localhost:3001/api/login"

export const login = async info => {
  const res = await axios.post(url, info)
  return res.data
}
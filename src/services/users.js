import axios from 'axios'

const url = "/api/users"

export const register = async info => {
  const res = await axios.post(url, info)
  return res.data
}

export const acceptFriend = async info => {
  const res = await axios.post(url + '/friends', info)
  return res.data
}

export const purchaseItem = async (id, item) => {
  const res = await axios.post(url + '/' + id + '/purchase/' + item)
  return res.data
}

export const getUser = async (id) => {
  const res = await axios.get(url + '/' + id)
  return res.data
}

export const getAllUsers = async (populated) => {
  const res = await axios.get(url + '/?populated=' + populated)
  return res.data
}

export const getAllUsersSorted = async (populated) => {
  const res = await axios.get(url + '/sorted')
  return res.data
}
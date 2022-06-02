import axios from 'axios'

const url = "/api/login"

export const login = async info => {
  const res = await axios.post(url, info)
  return res.data
}
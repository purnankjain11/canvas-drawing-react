const baseUrl = 'http://localhost:8080/api'

export const URL = {
  GET_FILES: `${baseUrl}/files`,
  GET_FILE_BY_NAME: (name) => `${baseUrl}/files/${name}`,
  SAVE_FILE: `${baseUrl}/files`
}
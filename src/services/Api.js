const BASE_URL = "https://apimalwarelab.securethread.io"

export const User = {
     SIGN_IN: BASE_URL + '/auth/login/google',
     TOKEN_VERIFICATION: BASE_URL + '/auth/token-validation',
}

export const Service = {
     File_ANALYSIS: BASE_URL + '/service/file/analysis',
     GET_FUNCTIONS: BASE_URL + '/service/file/function',
     SERVICE_DATA: BASE_URL + '/service/file/streaming',
     FILES_DATA: BASE_URL + '/service/file/paginate',
     GET_AI_DATA: BASE_URL + '/ai/code/vuln-detection',


}


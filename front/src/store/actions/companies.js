const getCompanies = (payload) => {
  return {
    type: "GET_ALL_COMPANIES",
    payload
  }
}


const deleteCompany = (payload) => {
  return {
    type: 'DELETE_COMPANY',
    payload
  }
}

export { getCompanies, deleteCompany };
const getEmployees = (payload) => {
  return {
    type: "GET_ALL_EMPLOYEES",
    payload
  }
}

const deleteEmployee = (payload) => {
  return {
    type: 'DELETE_EMPLOYEE',
    payload
  }
}

export { getEmployees, deleteEmployee };
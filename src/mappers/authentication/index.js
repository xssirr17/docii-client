export const requestOtpMapper = (mobileNumber) => ({ mobileNumber })

export const verifyOtpMapper = (otp, mobileNumber) => ({ otp, mobileNumber })

export const signupMapper = ({ nationalCode, firstName, lastName, password, phoneNumber }) => ({
  nationalId: nationalCode,
  firstName,
  lastName,
  password,
  mobileNumber: phoneNumber
})

export const loginMapper = ({ phoneNumber, password }) => ({ password, mobileNumber: phoneNumber })

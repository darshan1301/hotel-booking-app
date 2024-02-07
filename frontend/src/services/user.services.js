import base_url from "../base_url";

function removeSpacesFromEmail(email) {
  const cleanedEmail = email.replace(/\s/g, "");
  return cleanedEmail;
}

////////// USER LOGIN
export const loginHandler = async (email, password) => {
  const cleanedEmail = removeSpacesFromEmail(email);
  try {
    const response = await fetch(`${base_url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cleanedEmail, password }),
    });

    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

/////////USER SIGNUP
export const signupHandler = async (formData) => {
  try {
    const response = await fetch(`${base_url}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/////////USER INFO
export const getUserInfo = async (headers) => {
  try {
    const response = await fetch(`${base_url}/user/me`, {
      method: "GET",
      headers: headers,
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

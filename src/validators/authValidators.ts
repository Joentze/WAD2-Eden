export const validateEmail = (email: string): void => {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return;
  throw new Error(
    "The email entered is not valid, please following this format: Example@email.com"
  );
};

export const validatePhoneNo = (phoneNo: string): void => {
  if (
    phoneNo.length === 8 &&
    (phoneNo[0] === "6" || phoneNo[0] === "8" || phoneNo[0] === "9")
  )
    return;
  throw new Error("The phone number you entered is not valid!");
};

export const validateUrl = (url: string): void => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (pattern.test(url)) return;
  throw new Error(
    "The website URL you entered is not valid, please add in the following if you haven't: https:// OR http://"
  );
};

export const validatePhotoUrl = (url: string): void => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (pattern.test(url)) return;
  throw new Error("Please upload an image for your account profile picture!");
};

export const validateTexts = (texts: string[]) => {
  if (
    texts.filter((text) => text === undefined || text.length === 0).length > 0
  )
    throw new Error("All text fields must be filled!");
};

const URL = "https://randomuser.me/api/";

const getUser = async () => {
  const response = await fetch(URL);
  console.log(response);
  const data = await response.json();
  // destructure
  const person = data.results[0];
  console.log(person);
  const { phone, email } = person;
  const { large: image } = person.picture;
  const { password } = person.login;
  const { first, last } = person.name;
  const {
    dob: { age },
  } = person;
  console.log(person);
  const {
    street: { number, name },
  } = person.location;
  return {
    image,
    phone,
    email,
    password,
    age,
    street: `${number} ${name}`,
    name: `${first} ${last}`,
  };
};

export default getUser;

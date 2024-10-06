import fetch from "node-fetch";

const user = async (address) => {
    fetch(`http://localhost:3000/users/${address}`)
  .then((response) => response.json())
}

export default user;
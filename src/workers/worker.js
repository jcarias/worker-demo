export default () => {
  const createFile = data => {
    console.log("Creating file...");
    let fileText = "";
    let percentData = 0;
    if (data && Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        const currPercent = Math.floor((index * 1000) / data.length);
        if (currPercent !== percentData) {
          percentData = currPercent;
          postMessage({ percentValue: percentData / 10 });
        }

        const row = data[index];
        fileText += `${row["id"]};${row["name"]};${row["email"]};${new Date(
          row["dateJoined"]
        ).toISOString()};`;
        fileText += "\n";
      }
    }

    return fileText;
  };

  // eslint-disable-next-line no-restricted-globals
  self.addEventListener("message", e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;

    console.log(e.data);

    const users = [];

    for (let i = 0; i < 2000000; i++) {
      users.push({
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        id: i + 1,
        dateJoined: Date.now()
      });
    }

    const text = createFile(users);
    postMessage(text);
  });
};

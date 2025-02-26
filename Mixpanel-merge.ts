const duplicatedUserList = [ ['dup user 1a', 'dup user 1b')], ['dup user 2a', 'dup user 2b']] //Your Duplicated User list

const checkDuplicatedUser = (userList: string[][]) => {
  userList.forEach((user) => {
    if (user[0].toLowerCase() !== user[1].toLowerCase()) {
      console.log(user);
      return false;
    }
  });
  console.log('All duplicated');
  return true;
};
// Call this to confirm duplicated users are actually duplicated of each other
// checkDuplicatedUser(duplicatedUserList);

export const mixpanelAccountMerge = async () => {
  try {
    // Get accounts to merge
    duplicatedUserList.forEach(async (user) => {
      let response = await mixpanelMerge(user);
      console.log(response);
    });
    // let response = await mixpanelMerge(duplicatedUser);
    // console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

const mixpanelMerge = async (accounts: string[]) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic Secret Here',
    },
    body: JSON.stringify([
      {
        event: '$merge',
        properties: { $distinct_ids: accounts },
      },
    ]),
  };

  let response = await fetch(
    `https://api.mixpanel.com/import?strict=1&project_id=${Your project Id}`,
    options
  )
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .catch((err) => console.error(err));

  return response;
};

// Loop through the dup list and merge
// mixpanelAccountMerge();



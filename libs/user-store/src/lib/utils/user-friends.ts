// Since User objects provided by the 3rd party API don't
// include user friends, manually add five for each.

import { User } from '../model';

export const addUserFriends = (users: User[]): User[] => {
  const usersWithFriends = getUsersWithEmptyFriendIDs(users);
  usersWithFriends.forEach((user) => {
    const candidates = getFriendCandidates(usersWithFriends, user);
    const selectedCandidates = [];
    while (selectedCandidates.length < 5 && candidates.length) {
      selectCandidate(candidates, selectedCandidates);
    }
    updateUserAndSelectedCandidatesFriends(user, selectedCandidates);
  });
  return usersWithFriends;
};

const getUsersWithEmptyFriendIDs = (users: User[]): User[] => {
  const usersWithEmptyFriends: User[] = [];
  users.forEach((user) => {
    usersWithEmptyFriends.push(
      Object.assign({}, { ...user, friends: [], friendIDs: [] })
    );
  });
  return usersWithEmptyFriends;
};

const getFriendCandidates = (allUsers: User[], currentUser: User): User[] => {
  return allUsers.filter((user) => userIsViableCandidate(user, currentUser));
};

const userIsViableCandidate = (user: User, currentUser: User): boolean => {
  return (
    user.id !== currentUser.id &&
    user.friendIDs.length < 5 &&
    currentUser.friendIDs.indexOf(user.id) === -1
  );
};

const selectCandidate = (candidates: User[], selectedCandidates: User[]) => {
  let minNumOfFriends = Number.MAX_VALUE;
  let selectedCandidateIndex = -1;
  candidates.forEach((candidate, index) => {
    if (candidate.friendIDs.length < minNumOfFriends) {
      minNumOfFriends = candidate.friendIDs.length;
      selectedCandidateIndex = index;
    }
  });
  selectedCandidates.push(candidates[selectedCandidateIndex]);
  candidates.splice(selectedCandidateIndex, 1);
};

const updateUserAndSelectedCandidatesFriends = (
  user: User,
  selectedCandidates: User[]
) => {
  selectedCandidates.forEach((candidate) => {
    if (user.friendIDs.length < 5) {
      user.friendIDs.push(candidate.id);
      user.friends.push({
        id: candidate.id,
        pictureURL: candidate.pictureURL,
        username: candidate.username,
      });
      candidate.friendIDs.push(user.id);
      candidate.friends.push({
        id: user.id,
        pictureURL: user.pictureURL,
        username: user.username,
      });
    }
  });
};

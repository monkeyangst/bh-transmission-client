export default function getFilteredTorrents(torrentStore, prefsStore) {
  torrentStore.torrents.filter((torrent) => {
    if (
      prefsStore.statusFilter !== -1 &&
      prefsStore.statusFilter !== torrent.status
    )
      return false;
  });
}

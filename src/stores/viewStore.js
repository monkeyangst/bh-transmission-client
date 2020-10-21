import { runInAction, observable, makeObservable, action } from 'mobx';

class ViewStore {
  drawerOpen = false;
  selectedTorrents = [];

  constructor() {
    makeObservable(this, {
      selectedTorrents: observable,
      drawerOpen: observable,
      toggleSelected: action,
      toggleDrawer: action,
    });
  }

  toggleDrawer() {
    console.log('Should still be toggling');
    this.drawerOpen = !this.drawerOpen;
  }

  toggleSelected(torrentId) {
    // const torrent = this.selectedTorrents.find((torrentId) => id === torrentId);

    if (
      this.selectedTorrents.length < 1 ||
      this.selectedTorrents.indexOf(torrentId) === -1
    )
      this.selectedTorrents.push(torrentId);
    else
      this.selectedTorrents.splice(this.selectedTorrents.indexOf(torrentId), 1);
  }

  removeFromSelection(torrentId) {
    if (this.selectedTorrents.length > 0) {
      this.selectedthis.selectedTorrents.indexOf(torrentId);
    } else
      this.selectedTorrents.splice(this.selectedTorrents.indexOf(torrentId), 1);
  }
}

export default new ViewStore();

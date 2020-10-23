import { observable, makeObservable, action } from 'mobx';

class ViewStore {
  drawerOpen = false;
  selectedTorrents = [];
  contextAnchor = null;

  constructor() {
    makeObservable(this, {
      selectedTorrents: observable,
      drawerOpen: observable,
      contextAnchor: observable,
      toggleSelected: action,
      toggleDrawer: action,
      setContextAnchor: action,
      removeContextAnchor: action,
    });
  }

  setContextAnchor(event, torrent) {
    event.preventDefault();
    console.log('X', event.clientX);
    console.log('Y', event.clientY);
    this.contextAnchor = {
      torrent: torrent,
      posX: event.clientX,
      posY: event.clientY,
      anchorEl: event.target,
    };
  }

  removeContextAnchor = () => {
    this.contextAnchor = null;
  };

  toggleDrawer = () => {
    console.log('Should still be toggling');
    this.drawerOpen = !this.drawerOpen;
  };

  toggleSelected = (torrentId) => {
    // const torrent = this.selectedTorrents.find((torrentId) => id === torrentId);
    console.log('Here we are at toggleSelected');
    if (
      this.selectedTorrents.length < 1 ||
      this.selectedTorrents.indexOf(torrentId) === -1
    )
      this.selectedTorrents.push(torrentId);
    else
      this.selectedTorrents.splice(this.selectedTorrents.indexOf(torrentId), 1);
  };

  removeFromSelection(torrentId) {
    if (this.selectedTorrents.length > 0) {
      this.selectedthis.selectedTorrents.indexOf(torrentId);
    } else
      this.selectedTorrents.splice(this.selectedTorrents.indexOf(torrentId), 1);
  }
}

export default new ViewStore();

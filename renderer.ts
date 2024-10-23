const information: HTMLElement | null = document.getElementById('info');

information!.innerText = `This app is using Chrome (v${process.versions.chrome}), Node.js (v${process.versions.node}), and Electron (v${process.versions.electron})`
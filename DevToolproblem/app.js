    const progressContainer = document.getElementById('progress-container');
    const addButton = document.getElementById('addButton');

    const resume = document.getElementById("resume");
    const pause = document.getElementById("pause");
    let progressBarList = [];
    let loading = false;

    addButton.addEventListener('click', () => {
      addProgressBar();
      if (loading == false) {
        loadProgressBar();
      }
    });

    function addProgressBar() {
      const progressBarContainer = document.createElement('div');
      progressBarContainer.className = 'progress-bar-container';
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBarContainer.appendChild(progressBar);
      progressContainer.appendChild(progressBarContainer);
    }
  
    function loadProgressBar() {
      const progressBarContainers = progressContainer.getElementsByClassName('progress-bar-container');
      if (progressBarList.length < progressBarContainers.length) {
        const progressBarContainer = progressBarContainers[progressBarList.length];
        loading = true;

        requestAnimationFrame(() => {
          progressBarContainer.querySelector('.progress-bar').style.display = "block";
        });

        resume.addEventListener('click', () => {
          progressBarContainer.querySelector('.progress-bar').style.animationPlayState = 'running';
        })
        pause.addEventListener('click', () => {
          progressBarContainer.querySelector('.progress-bar').style.animationPlayState = 'paused';
        })
    
        progressBarContainer.querySelector('.progress-bar').addEventListener("animationend",()=>{
            progressBarList.push(progressBarContainer);
            loading = false;
            loadProgressBar();
        })
      }
    }


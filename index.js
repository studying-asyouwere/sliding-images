const track = document.getElementById("image-track");
const slideFriction = 1;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth * slideFriction;

    const percentage = - (mouseDelta / maxDelta) * 100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`
        }, 
        {
            duration: 1200, fill: "forwards"
        }
    )

    for (const image of track.getElementsByClassName("image")){
        image.animate(
            {
                objectPosition: `${nextPercentage + 100}% 50%`
            }, 
            {
                duration: 1200, fill: "forwards"
            }
        )
    }
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
}


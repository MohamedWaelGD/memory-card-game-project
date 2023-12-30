class Cube {
    constructor(cube, inner, front, back, img, value) {
        this.cube = cube;
        this.inner = inner;
        this.front = front;
        this.back = back;
        this.img = img;
        this.value = value;
        this.isSuccess = false;
    }

    setValue(v) {
        this.value = v;
    }

    compareValue(value) {
        return value === this.value;
    }

    setImg(imgUrl) {
        this.img.src = imgUrl;
    }

    addRotateCube() {
        playClickAudio();
        const front = this.front;
        const back = this.back;
        front.classList.add('rotate-front');
        back.classList.add('rotate-back');
    }

    removeRotateCube() {
        const front = this.front;
        const back = this.back;
        front.classList.remove('rotate-front');
        back.classList.remove('rotate-back');
    }

    errorAnim() {
        playErrorAudio();
        const onAddAnim = new Promise((resolve) => {
            setTimeout(()=>{
                this.inner.classList.add('error-anim');
                resolve();
            }, 200)
        }).then((resolve) => {
            setTimeout(()=>{
                this.inner.classList.remove('error-anim');
            }, 200)
        })
    }
}
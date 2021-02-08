<template>
    <div>
        <input @keydown="keyUp"/>

        <h1>Frame by frame control example</h1>
        <h2>animation duration in frames {{duration}} current frame is {{currentFrame}} </h2>
        <lottie-animation path="data.json" @AnimControl="setAnimController"/>
    </div>
</template>

<script>
    import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs
    
    let _controller;
    const isFrame = true;
    
    export default {
        components:{
            LottieAnimation,
        },
        name: 'HelloWorld',
        data: function (){
          return {
            duration:-1,
            currentFrame: 0,
          };
        },
        props: {
            msg: String,
        },
        methods: {
            setAnimController(controller){
                console.log("set controller", controller);
                console.log()
                _controller = controller;
                this.duration = _controller.getDuration(isFrame);
                _controller.goToAndStop(this.currentFrame, isFrame);
            },
            keyUp(){
              if(_controller){
                  this.currentFrame = (this.currentFrame + 1) % this.duration;
                  _controller.goToAndStop(this.currentFrame, isFrame);
              }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

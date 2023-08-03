<template>
  <div class="hero">
    <h1>Excellence in Engineering, Commitment to Quality</h1>

    <p>"Building the Future, Together"</p>

    <button><a href="#services">Our Services</a></button>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.hero {
  background-image: url("../../public/img/hero3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
}
.hero h1 {
  font-size: 30px;
  color: white;
}
.hero p {
  font-size: 20px;
  color: white;
  @apply my-5;
}
.hero button {
  font-size: 20px;
  color: white;
  background: #0177fb;
  padding: 4px;
  border-radius: 20px;
}
</style>

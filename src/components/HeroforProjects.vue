<template>
  <div class="heroForProjects">
    <h1>The Key of Our Success</h1>

    <p>Check our completed projects</p>

    <button><a href="#services">Our Projects</a></button>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.heroForProjects {
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
  padding-top: 50px;
}
.heroForProjects h1 {
  font-size: 30px;
  color: white;
}
.heroForProjects p {
  font-size: 20px;
  color: white;
  @apply my-5;
}
.heroForProjects button {
  font-size: 20px;
  color: white;
  background: #0177fb;
  padding: 4px;
  border-radius: 20px;
}
</style>

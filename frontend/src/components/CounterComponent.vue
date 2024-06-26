<template>
  <div>
    <h1>{{ counter }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  name: "CounterComponent",
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter += 1;
    },
    decrement() {
      this.counter -= 1;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin: 20px 0;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>

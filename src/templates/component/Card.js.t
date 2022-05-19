{{ if (it.framework === 0)  { }}
import exampleImg from "../assets/example.svg";

const panel = document.createElement("div");
panel.classList.add("rb-example__panel");

const img = {
    src: exampleImg,
    alt: "example-img",
    class: "example-img",
  };
  const exampleImage = `<img src=${img.src} class=${img.class} alt=${img.alt}>`;


const card = document.createElement("div");
card.innerHTML =
  exampleImage +
  "<h3>Example Card component</h3><p>Developing on the Red Bull Platform with Vanilla JavaScript is fun!!!</p>";

card.classList.add("rb-example__card");
panel.appendChild(card);

export default panel;
{{ } }}

{{ if (it.framework === 1 && it.language === 1)  { }}
import { useState } from 'preact/hooks';

import exampleImg from '../assets/example.svg';

export default function Card() {

  const [title, setTitle] = useState("Example Card component");
 
  return (
    <div class="rb-example__panel">
      <div class="rb-example__card">
        <img src={exampleImg} class="example-img" alt="example-img" />
        <h3>{title}</h3>
        <p>Developing on the Red Bull Platform with Preact is awesome!</p>
      </div>
  </div>
  )
}

{{ } }}

{{ if (it.framework === 1 && it.language === 0)  { }}
import { h, render, Component } from 'preact';

import exampleImg from '../assets/example.svg';

class Card extends Component {
  state = {
    exaggeration: 'just so fantastic!!',
  }

  render() {
    return (
      <div className="rb-example__panel">
        <div className="rb-example__card">
        <img src={exampleImg} className="example-img" alt="Example-Image"/>
          <h3>Example Card component</h3>
          <p>Developing on the Red Bull Platform with Preact is {this.state.exaggeration}!</p>
        </div>
      </div>
    );
  }
}

export default Card;

{{ } }}

{{ if (it.framework === 2)  { }}
<script>
  import exampleImg from '../assets/example.svg';

  let exaggeration = 'ridiculously fun!!!'
</script>
<div class="rb-example__panel">
  <div class="rb-example__card">
    <img src={exampleImg} class="example-img" alt="example-img"/>
    <h3>Example Card component</h3>
    <p>Developing on the Red Bull Platform with Svelte is {exaggeration}!</p>
  </div>
</div>
{{ } }}

{{ if (it.framework === 3)  { }}

<template> 
  <div class="rb-example__panel">
    <div class="rb-example__card">
      <img :src="exampleImg" class="example-img" alt="example-img"/>
      <h3>Example Card component</h3>
      <p>Developing on the Red Bull Platform with Vue is awesome!</p>
    </div>
  </div>
</template>

<script>
import exampleImg from '../assets/example.svg';

export default {
  
  data: function () {
    return {
      exampleImg 
    }  
  }
};
</script>

{{ } }}
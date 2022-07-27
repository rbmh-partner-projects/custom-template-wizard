{{ if (it.framework === 0)  { }}
import { defineCosmosDefaultCard } from "@cosmos/web";
import rbLogo from "../assets/rb-logo.jpeg";

const panel = document.createElement("div");
panel.classList.add("rb-example__panel");

defineCosmosDefaultCard();

const cosmosCard = `<cosmos-default-card 
                      appearance="light" 
                      headline="Example Card component" 
                      cover="false" image=${rbLogo} 
                      image-alt="Example-Image" 
                      rel="noopener noreferrer" 
                      tag="Example" 
                      target="_blank" 
                      text="Developing on the Red Bull Platform with Vanilla JavaScript is fun!!!!"
                      layout="normal" >
                    </cosmos-default-card>`

const card = document.createElement("div");
card.innerHTML = cosmosCard;

card.classList.add("cosmos-example__panel");
panel.appendChild(card);

export default panel;

{{ } }}

{{ if (it.framework === 1 && it.language === 1)  { }}
import { CosmosDefaultCard } from "@cosmos/web/preact";
import { h } from "preact";
import type { JSX } from "@cosmos/web";

import rbLogo from  "../assets/rb-logo.jpeg";

const cardProps : JSX.CosmosDefaultCard = {
  image: rbLogo,
  imageAlt: 'Example-Image',
  appearance: 'light',
  headline: 'Example Card component',
  cover: false,
  text: 'Developing on the Red Bull Platform with Preact is just so fantastic!',
  rel: "noopener noreferrer",
  tag: "example",
  target: "_blank",
  layout: "normal"
}

export default function Card() {
  return (
    <div className="rb-example__panel">
      <div className="cosmos-example__panel">
        <CosmosDefaultCard
          {...cardProps}
        >
        </CosmosDefaultCard>
      </div>
    </div>
  );
}

{{ } }}

{{ if (it.framework === 1 && it.language === 0)  { }}
import { h, render, Component } from "preact";
import { CosmosDefaultCard } from '@cosmos/web/preact';

import rbLogo from "../assets/rb-logo.jpeg";

class Card extends Component {

  render() {
    return (
      <div className="rb-example__panel">
        <div className="cosmos-example__panel">
          <CosmosDefaultCard 
            appearance="light" 
            headline="Example Card component" 
            cover="false"
            image= {rbLogo}
            image-alt="Example-Image" 
            rel="noopener noreferrer" 
            tag="Example" 
            target="_blank" 
            text="Developing on the Red Bull Platform with Preact is just so fantastic!"
            layout="normal"
            >
          </CosmosDefaultCard>
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
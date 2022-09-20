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

const liHeader = `<li class="li-header"> `;
const innerUl = `<ul class="inner-ul"> `;

const platformsLink = `<a href="https://platforms.redbull.com/develop/custom-development" target="_blank">Documentation</a>`
const jotformLink = `<a href="https://platformservices.redbull.com/docs/jotform" target="_blank">Documentation</a>`
const crepoLink = `<a href="https://api.developers.redbull.com/docs/graphql-api-node-sdk" target="_blank">GraphQL API Node SDK</a>`;
const rollupLink = `<a href="https://rollupjs.org/guide/en/" target="_blank">Documentation</a>`;
const rollupCheatsheetLink = `<a href="https://devhints.io/rollup" target="_blank">Cheatsheet </a>`;
const herokuLink = `<a href="https://devcenter.heroku.com/categories/reference" target="_blank">Documentation</a>`;
const XCLink = `<a href="https://experience.redbull.com/" target="_target">Experience Center </a>`;
const renderLink = `<a href="https://render.com/docs" target="_target">Documentation</a>`;
const cosmosLink = `<a href="https://cosmos.redbull.design/9c8c28406/p/43ac2a-introduction" target="_blank">Documentation </a>`

const infobox = document.createElement("div");
infobox.innerHTML = 
  "<h2>Before you start some helpful Links</h2>" + "<ul>" 
  + liHeader + "Red Bull Custom Development</li>" + innerUl + "<li>" + platformsLink + "</li>" + "</ul>"
  + liHeader + "Jotform</li>" + innerUl + "<li>" + jotformLink + "</li>" + "</ul>"
  + liHeader + "CREPO API</li>" + innerUl + "<li>" + crepoLink + "</li>" + "</ul>"
  + liHeader + "Rollup.js Bundler</li>" + innerUl + "<li>" + rollupLink + "</li>" + "<li>" + rollupCheatsheetLink + "for multiple outputs</li>" + "</ul>"
  + liHeader + "Heroku</li>" + innerUl + "<li>" + herokuLink + "</li>" + "<li>" + XCLink + "to connect your Heroku App to</li>" + "</ul>"
  + liHeader + "Render</li>" + innerUl + "<li>" + renderLink + "</li>" + "</ul>"
  + liHeader + "Cosmos Web Components</li>" + innerUl + "<li>" + cosmosLink + "– Currently only for Preact & Vue</li>" + "</ul>"
  + "</ul>"

card.classList.add("rb-example__card");
infobox.classList.add("rb-example__infobox");
panel.appendChild(card);
panel.appendChild(infobox);

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
import { h, render, Component } from "preact";
import { CosmosStoryCard } from "@cosmos/web-scoped/preact";
import image from "../assets/story-card-image.jpeg";

const Card = ({ children }) => {
  return (
    <div className='my-panel'>
      <CosmosStoryCard
        className='my-panel__card'
        image={image}
        imageAlt='A rally car that is throwing up dust'
        headline='Rally Kazakhstan was your reminder that nothing can stop Cristina Gutiérrez'
        text="It's back-to-back FIA World Cup for Cross Country Rallies wins for Spain's T3 queen Cristina"
        href='https://www.redbull.com/int-en/rally-kazakhstan-recap-2021-fia-world-cup-for-cross-country-rallies'
        tag='Rally Raid'
        badge='Popular'
        reading-time='3 min read'
      ></CosmosStoryCard>
      <div className="my-panel__infobox">
        <h2>Before you start some helpful Links</h2>
        <ul>
          <li className="li-header">Red Bull Custom Development</li>
            <ul className="inner-ul">
              <li><a href="https://platforms.redbull.com/develop/custom-development" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            </ul>
          <li className="li-header">Jotform</li>
            <ul className="inner-ul">
              <li><a href="https://platformservices.redbull.com/docs/jotform" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            </ul>
          <li className="li-header">CREPO API</li>
            <ul className="inner-ul">
              <li><a href="https://api.developers.redbull.com/docs/graphql-api-node-sdk" target="_blank" rel="noopener noreferrer">GraphQL API Node SDK</a></li>
            </ul>
          <li className="li-header">Rollup.js Bundler</li>
            <ul className="inner-ul">
              <li><a href="https://rollupjs.org/guide/en/" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="https://devhints.io/rollup" target="_blank" rel="noopener noreferrer">Cheatseet</a> for multiple outputs</li>
            </ul>
          <li className="li-header">Heroku</li>
            <ul className="inner-ul">
              <li><a href="https://devcenter.heroku.com/categories/reference" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="https://experience.redbull.com/" target="_blank" rel="noopener noreferrer">Experience Center</a> to connect your Heroku App to</li>
            </ul>
          <li className="li-header">Render</li>
            <ul className="inner-ul">
              <li><a href="https://render.com/docs" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            </ul>
          <li className="li-header">Cosmos Web Components</li>
            <ul className="inner-ul">
              <li><a href="https://cosmos.redbull.design/9c8c28406/p/43ac2a-introduction" target="_blank" rel="noopener noreferrer">Documentation</a> – Currently only for Preact & Vue</li>
            </ul>
        </ul>
      </div>
    </div>
  );
};

export default Card;

{{ } }}

{{ if (it.framework === 2)  { }}
<script>
  import exampleImg from "../assets/example.svg";

  let exaggeration = "ridiculously fun!!!";
</script>
<div class="rb-example__panel">
  <div class="rb-example__card">
    <img src="{exampleImg}" class="example-img" alt="example-img" />
    <h3>Example Card component</h3>
    <p>Developing on the Red Bull Platform with Svelte is {exaggeration}!</p>
  </div>
  <div class="rb-example__infobox">
    <h2>Before you start some helpful Links</h2>
    <ul>
      <li class="li-header">Red Bull Custom Development</li>
      <ul class="inner-ul">
        <li>
          <a
            href="https://platforms.redbull.com/develop/custom-development"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </li>
      </ul>
      <li class="li-header">Jotform</li>
      <ul class="inner-ul">
        <li>
          <a
            href="https://platformservices.redbull.com/docs/jotform"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </li>
      </ul>
      <li class="li-header">CREPO API</li>
      <ul class="inner-ul">
        <li>
          <a
            href="https://api.developers.redbull.com/docs/graphql-api-node-sdk"
            target="_blank"
            rel="noopener noreferrer"
          >
            GraphQL API Node SDK
          </a>
        </li>
      </ul>
      <li class="li-header">Rollup.js Bundler</li>
      <ul class="inner-ul">
        <li>
          <a href="https://rollupjs.org/guide/en/" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </li>
        <li>
          <a href="https://devhints.io/rollup" target="_blank" rel="noopener noreferrer">
            Cheatseet
          </a>{" "}
          for multiple outputs
        </li>
      </ul>
      <li class="li-header">Heroku</li>
      <ul class="inner-ul">
        <li>
          <a
            href="https://devcenter.heroku.com/categories/reference"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </li>
        <li>
          <a href="https://experience.redbull.com/" target="_blank" rel="noopener noreferrer">
            Experience Center
          </a>{" "}
          to connect your Heroku App to
        </li>
      </ul>
      <li class="li-header">Render</li>
      <ul class="inner-ul">
        <li>
          <a href="https://render.com/docs" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </li>
      </ul>
      <li class="li-header">Cosmos Web Components</li>
      <ul class="inner-ul">
        <li>
          <a
            href="https://cosmos.redbull.design/9c8c28406/p/43ac2a-introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>{" "}
          – Currently only for Preact & Vue
        </li>
      </ul>
    </ul>
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
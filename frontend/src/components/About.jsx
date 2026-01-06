import React from "react";
import { Button } from "react-bootstrap";

function About() {
  return (
    <div className="h-100 d-flex flex-column justify-content-between p-4">
      <div>
        <h3>About</h3>
        <h2>Evangadi Networks Q&A</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          quaerat natus minima accusamus...
        </p>
      </div>
      <div className="text-start">
        <Button variant="warning" size="lg">
          How it works
        </Button>
      </div>
    </div>
  );
}

export default About;

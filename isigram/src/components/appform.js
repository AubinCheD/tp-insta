import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './appform.css';

export default class AppForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="prenom">Prénom</Label>
          <Input type="text" name="prenom" id="prenom" placeholder="Entrez votre prénom" />
        </FormGroup>
        <FormGroup>
          <Label for="nom">Nom</Label>
          <Input type="text" name="nom" id="nom" placeholder="Entrez votre nom" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Entrez votre adresse email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Choisissez votre mot de passe" />
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Sexe</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" defaultChecked/>{' '}
              Homme
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />{' '}
              Femme
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Accepter les CGU Isigram
          </Label>
        </FormGroup>
        <Button>S'inscrire</Button>
      </Form>
    );
  }
}

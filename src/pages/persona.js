import React from 'react'
import { useAsync } from 'react-use';
import axios from 'axios';
import { Row, Col, Card, Progress, Comment, Avatar } from 'antd';
import { reducer, useThunkReducer } from '../redux';
import search from '../services/rapidapi'

const { Meta } = Card;

const gridStyle = {
  width: '33%',
};

const randomElement = function (arrayList) {
  return arrayList[Math.floor((Math.random() * arrayList.length))]
}

export default function Persona ({ id }) {

  const initialProgress = {
    count: 0,
    class: 'active'
  }

  const [progress, dispatchProgress] = useThunkReducer(reducer, initialProgress);

  const datosCompletos = useAsync(async () => {
    const data = {
      'status': 200,
      'photo': {},
      'people': [],
      'species': [],
      'starships': [],
      'homeworld': [],
      'vehicles': []
    }

    const people = await axios.get(`https://swapi.dev/api/people/${id}/`, { validateStatus: false })

    data.people = people.data

    if (people.status !== 200) {
      return { status: people.status }
    }

    dispatchProgress({ type: 'init' })

    const imgs = await search(people.data.name)
    data.photo = randomElement(imgs.value)

    const homeworld = await axios.get(people.data.homeworld)
    data.homeworld = homeworld.data
    dispatchProgress({ type: 'increment' })

    if (people.data.species[0]) {
      const species = await axios.get(people.data.species[0])
      data.species = species.data
      dispatchProgress({ type: 'increment' })
    }

    if (people.data.vehicles[0]) {
      const vehicles = await axios.get(people.data.vehicles[0])
      data.vehicles = vehicles.data
      dispatchProgress({ type: 'increment' })
    }

    if (people.data.starships[0]) {
      const starships = await axios.get(people.data.starships[0])
      data.starships = starships.data
      dispatchProgress({ type: 'increment' })
    }

    dispatchProgress({ type: 'done' })
    return data
  }, [])

  if (datosCompletos.loading) {
    return <>
      <Progress percent={progress.count} status={progress.class} /> <br />
      <Comment
        style={{ border: '1px solid #ccc' }}
        author={'Yoda'}
        avatar={<Avatar
          size={'large'}
          src="https://apollo-virginia.akamaized.net/v1/files/syf5vl23zvd23-PE/image"
          alt="Yoda" />}
        content={
          <p>
            “Paciente debes tener, mi joven padawan”
          </p>
        }
      />
    </>
  }

  const { people, species, vehicles, starships, homeworld, photo } = datosCompletos.value

  return <>
    <Progress percent={progress.count} status={progress.class} style={{ marginBottom: '20px' }} />

    <Row gutter={[10, 10]}>
      <Col className="gutter-row" span={6} >
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt={people.name} src={photo.url} />}
        >
          <Meta title={people.name} description={photo.title} />
        </Card>
      </Col>

      <Col className="gutter-row" span={18} >
        <Card title={`Nombre: ${people.name}`}>
          <Card.Grid style={gridStyle}>
            <h3>🙋‍♂️ Datos:</h3>
            <ul>
              <li>Fecha de nacimiento: {people.birth_year}</li>
              <li>Genero: {people.gender}</li>
              <li>Color de ojos: {people.eye_color}</li>
              <li>Color de cabello:{people.hair_color}</li>
              <li>Color de piel: {people.skin_color}</li>
              <li>Talla: {people.height}</li>
              <li>Peso: {people.mass}</li>
            </ul>
          </Card.Grid>

          <Card.Grid style={gridStyle}>
            <h3>💯 Estadisticas</h3>
            <ul>
              <li>Total de vehiculos terrestres: {people.vehicles.length}</li>
              <li>Total de naves espaciales: {people.starships.length}</li>
            </ul>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>🪐 Mundo natal: </h3>
            <ul>
              <li>Nombre: {homeworld.name}</li>
              <li>Gravedad: {homeworld.gravity}</li>
              <li>Clima: {homeworld.climate}</li>
              <li>Diametro: {homeworld.diameter}</li>
              <li>Rotación: {homeworld.rotation_period}</li>
            </ul>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>🚗 Último vehiculo terrestre: </h3>
            {
              vehicles.length ?
                <ul>
                  <li>Nombre: {vehicles.name}</li>
                  <li>Modelo: {vehicles.model}</li>
                  <li>Pasajeros: {vehicles.passengers}</li>
                </ul>
                :
                'No hay datos'
            }
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>✈ Última nave espacial: </h3>
            {
              starships.length ?
                <ul>
                  <li>Nombre: {starships.name}</li>
                  <li>Clase: {starships.starship_class}</li>
                  <li>Fabricante: {starships.manufacturer}</li>
                  <li>Modelo: {starships.model}</li>
                </ul>
                : 'No hay datos'
            }
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>Especie</h3>
            {
              species.name ?
                <ul>
                  <li>Nombre: {species.name}</li>
                  <li>Lenguaje: {species.language}</li>
                  <li>Clasificación: {species.classification}</li>
                  <li>Designación: {species.designation}</li>
                </ul>
                : 'No hay datos'
            }

          </Card.Grid>
        </Card>
      </Col>
    </Row>


  </>
}

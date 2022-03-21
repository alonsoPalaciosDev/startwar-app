import { ZoomInOutlined } from '@ant-design/icons'
import { Alert, Image, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, } from 'react-navi'
import { useAsync } from 'react-use'


const columns = [
  {
    title: 'Avatar',
    render: (item) => <Image
      width={64}
      src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${item.name}`}
    />
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Peso y Tamaño',
    key: 'height_mass',
    render: item => `${item.height}cm / ${item.mass}kg`,
  },
  {
    title: 'Genero',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Caracteristicas',
    children: [
      {
        title: 'Color de ojos',
        render: item => <Tag color={item.eye_color}>{item.eye_color}</Tag>
      },
      {
        title: 'Color de piel',
        dataIndex: 'skin_color',
        key: 'skin_color',
      },
      {
        title: 'Color de cabello',
        dataIndex: 'hair_color',
        key: 'hair_color',
      },
    ]
  },
  {
    title: 'Año Nac.',
    dataIndex: 'birth_year',
    key: 'birth_year',
  },
  {
    title: 'Actions',
    key: 'operation',
    render: (item) => {
      const id = item.url.match(/\d+/)[0]
      return <Link href={`/persona/${id}`} type="primary" class='ant-btn ant-btn-primary'>
        <ZoomInOutlined /> Detalles
      </Link>
    },
  },
]

export default function Index () {

  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: false
  })

  const personajes = useAsync(async () => {
    const response = await axios.get('https://swapi.dev/api/people', {
      params: { page: pagination.current }
    });

    if (response.data?.count) {
      setPagination({ ...pagination, total: response.data.count })
    }

    return response.data;
  }, [pagination.current]);


  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({ ...pagination })
  };

  return <>
    <Alert message={
      personajes.loading
        ? 'Cargando ...'
        : `Mostrando ${personajes?.value?.count} personajes.`
    } type="success" />
    <br />

    <Table
      onChange={handleTableChange}
      rowKey={row => row.name}
      loading={personajes.loading}
      pagination={pagination}
      dataSource={personajes?.value?.results}
      columns={columns} />
  </>
}

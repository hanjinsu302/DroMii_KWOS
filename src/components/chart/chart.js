
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ApexChart = () => {
    const [show, setShow] = useState(false);
  const [series, setSeries] = useState([
    {
      name: '강수량 (mm)',
      data: [ 1036, 1493,  1190, 2133, 1401, 987]
    },
    {
      name: '유입량 (백만m³)',
      data: [ 394, 765, 540, 1530, 641, 379]
    }
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2017-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2019-09-19T03:30:00.000Z",
        "2020-09-19T04:30:00.000Z",
        "2021-09-19T05:30:00.000Z",
        "2022-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  });

  return (
    <div>
         <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="chart">
        <ReactApexChart 
          options={options} 
          series={series} 
          type="area" 
          height={350} 
        />
      </div>
      <div id="html-dist"></div>
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default ApexChart;

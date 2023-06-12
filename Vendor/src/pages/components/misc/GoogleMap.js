import React from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Card } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
} from "../../../components/Component";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMapPage = () => {
  return (
    <React.Fragment>
      <Head title="Google map"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            
            <BlockTitle tag="h2" className="fw-normal">
              Google Map
            </BlockTitle>
            <BlockDes>
              <p className="lead">Google map is using with Embed code and API Scripts</p>
              <p className="lead">
                For more info please visit{" "}
                <a href="https://mapsplatform.google.com/" target="_blank" rel="noreferrer">
                  Google Cloud
                </a>
                .
              </p>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Map with Embed</BlockTitle>
              <BlockDes>
              91173-7900
              <br></br>
              P: +1.262.757.0028
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Card className="card-bordered w-100 h-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.701199282437!2d80.24697581430512!3d13.05468171658318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267a37240c3d5%3A0x37b9b680aba775d6!2sBabyAmore!5e0!3m2!1sen!2sin!4v1651466543584!5m2!1sen!2sin"
                className="google-map border-0"
                height="400"
                allowFullScreen=""
                loading="lazy"
                title="google-map"
              ></iframe>
            </Card>
          </PreviewCard>
         
        </Block>

      
      </Content>
    </React.Fragment>
  );
};

export default GoogleMapPage;

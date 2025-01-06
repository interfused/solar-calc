import "../App.css";
import { AppNav } from "../layout/AppNav";

const glossaryTerms = [
  {
    term: "Average DNI",
    definition:
      "<strong>Average Direct Normal Irradiance</strong>: This data provides monthly average and annual average daily total solar resource averaged over surface cells of 0.1 degrees in both latitude and longitude, or about 10 km in size. The values returned are kWh/m2/day (kilowatt hours per square meter per day). The insolation values represent the resource available to concentrating systems that track the sun throughout the day. The data are created using the SUNY Satellite Solar Radiation model (Perez, et.al., 2002). The data are averaged from hourly model output over 12 years (1998-2009). This model uses hourly radiance images from geostationary weather satellites, daily snow cover data, and monthly averages of atmospheric water vapor, trace gases, and the amount of aerosols in the atmosphere to calculate the hourly total insolation (sun and sky) falling on a horizontal surface. The direct beam radiation is then calculated using the atmospheric water vapor, trace gases, and aerosols, which are derived from a variety of sources. Where possible, existing ground measurement stations are used to validate the data.",
  },
  {
    term: "Average GHI",
    definition:
      "<strong>Average Global Horizontal Irradiance</strong>: This data provides monthly average and annual average daily total solar resource averaged over surface cells of 0.1 degrees in both latitude and longitude, or about 10 km in size. The values returned are kWh/m2/day (kilowatt hours per square meter per day). The insolation values represent the global horizontal resource - the geometric sum of direct normal and diffuse irradiance components, representing total energy available on a planar surface. The data are created using the SUNY Satellite Solar Radiation model (Perez, et.al., 2002). The data are averaged from hourly model output over 12 years (1998-2009). This model uses hourly radiance images from geostationary weather satellites, daily snow cover data, and monthly averages of atmospheric water vapor, trace gases, and the amount of aerosols in the atmosphere to calculate the hourly total insolation (sun and sky) falling on a horizontal surface. The direct beam radiation is then calculated using the atmospheric water vapor, trace gases, and aerosols, which are derived from a variety of sources. Where possible, existing ground measurement stations are used to validate the data.",
  },
  {
    term: "Average Lat Tilt",
    definition:
      "<strong>Average Tilt at Latitude</strong>: This data provides monthly average and annual average daily total solar resource averaged over surface cells of 0.1 degrees in both latitude and longitude, or about 10 km in size. The values returned are kWh/m<sup>2</sup>/day (kilowatt hours per square meter per day). The insolation values represent the resource available to fixed flat plate system tilted towards the equator at an angle equal to the latitude. The data are created using the SUNY Satellite Solar Radiation model (Perez, et.al., 2002). The data are averaged from hourly model output over 12 years (1998-2009). This model uses hourly radiance images from geostationary weather satellites, daily snow cover data, and monthly averages of atmospheric water vapor, trace gases, and the amount of aerosols in the atmosphere to calculate the hourly total insolation (sun and sky) falling on a horizontal surface. The direct beam radiation is then calculated using the atmospheric water vapor, trace gases, and aerosols, which are derived from a variety of sources. Where possible, existing ground measurement stations are used to validate the data.",
  },
];

function Glossary() {
  return (
    <>
      <AppNav></AppNav>
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="mb-4">Glossary of Terms</h2>

        {glossaryTerms.map((item) => (
          <div className="flex flex-row mb-4">
            <div className="w-2/12">
              <strong>{item.term}</strong>
            </div>
            <div
              className="w-10/12"
              dangerouslySetInnerHTML={{ __html: item.definition }}
            ></div>
          </div>
        ))}

        <p className="mt-8">
          <small>
            https://developer.nrel.gov/docs/solar/solar-resource-v1/
          </small>
        </p>
      </div>
    </>
  );
}

export default Glossary;

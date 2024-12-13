import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Country() {
  const { name } = useParams();
  console.log(name);
  
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const url = `https://restcountries.com/v3.1/all`;
        const response = await fetch(url);
        const data = await response.json();
        const selectedCountry = data.find((country) => country.name.common == name);
console.log("selectedCountry: ", selectedCountry);

        setCountry({
          name: selectedCountry.name.common,
          population: selectedCountry.population,
          region: selectedCountry.region,
          capital: selectedCountry.capital ? selectedCountry.capital[0] : "Unknown",
          flag: selectedCountry.flags.svg,
        });
      } catch (error) {
        console.error("Error fetching country: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div>
            <i className="fa-solid fa-spinner fa-spin text-9xl"></i>
          </div>
        </div>
      ) : (
        country && (
          <div className="flex flex-col items-center">
            <img src={country.flag} alt={`${country.name} flag`} className="w-64 h-40 object-cover mb-6" />
            <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
            <p>
              <b>Population:</b> {country.population.toLocaleString()}
            </p>
            <p>
              <b>Region:</b> {country.region}
            </p>
            <p>
              <b>Capital:</b> {country.capital}
            </p>
          </div>
        )
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import { Country, Team } from "../components/filter/types";

const API_KEY = "9fd61d75e0msh107e104bc68b2e8p1f9af6jsnea65ae8ea3a4asdfg";
const API_HOST = "api-football-v1.p.rapidapi.com";

export const useFilterData = (selectedCountry: string) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [clubs, setClubs] = useState<Team[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingClubs, setLoadingClubs] = useState(false);
    const [countryInput, setCountryInput] = useState("");
    const [clubInput, setClubInput] = useState("");

    const fetchCountries = async (search: string) => {
        if (!search) return;
        setLoadingCountries(true);
        try {
            const response = await axios.get(
                "https://api-football-v1.p.rapidapi.com/v3/countries",
                {
                    params: { search },
                    headers: {
                        "x-rapidapi-key": API_KEY,
                        "x-rapidapi-host": API_HOST,
                    },
                }
            );
            setCountries(response.data.response);
        } catch (error) {
            console.error("Error fetching countries:", error);
        } finally {
            setLoadingCountries(false);
        }
    };

    const fetchClubs = async (search: string) => {
        setLoadingClubs(true);
        try {
            const response = await axios.get(
                "https://api-football-v1.p.rapidapi.com/v3/teams",
                {
                    params: {
                        search,
                        country: selectedCountry,
                    },
                    headers: {
                        "x-rapidapi-key": API_KEY,
                        "x-rapidapi-host": API_HOST,
                    },
                }
            );
            setClubs(response.data.response);
        } catch (error) {
            console.error("Error fetching clubs:", error);
        } finally {
            setLoadingClubs(false);
        }
    };

    useEffect(() => {
        if (countryInput) {
            const timeoutId = setTimeout(
                () => fetchCountries(countryInput),
                500
            );
            return () => clearTimeout(timeoutId);
        }
    }, [countryInput]);

    useEffect(() => {
        if (clubInput) {
            const timeoutId = setTimeout(() => fetchClubs(clubInput), 500);
            return () => clearTimeout(timeoutId);
        }
    }, [clubInput, selectedCountry]);

    return {
        countries,
        clubs,
        loadingCountries,
        loadingClubs,
        setCountryInput,
        setClubInput,
        setClubs,
    };
};

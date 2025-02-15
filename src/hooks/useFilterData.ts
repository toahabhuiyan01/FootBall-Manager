import { useState, useEffect } from "react";
import axios from "axios";

interface Country {
    name: string;
    code: string;
    flag: string;
}

interface Team {
    team: {
        name: string;
        country: string;
        logo: string;
    };
}

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
            const response = await axios.request({
                method: "GET",
                url: "https://api-football-v1.p.rapidapi.com/v3/countries",
                params: { search },
                headers: {
                    "x-rapidapi-key":
                        "9fd61d75e0msh107e104bc68b2e8p1f9af6jsnea65ae8ea3a4",
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                },
            });
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
            const response = await axios.request({
                method: "GET",
                url: "https://api-football-v1.p.rapidapi.com/v3/teams",
                params: {
                    search,
                    country: selectedCountry,
                },
                headers: {
                    "x-rapidapi-key":
                        "9fd61d75e0msh107e104bc68b2e8p1f9af6jsnea65ae8ea3a4",
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                },
            });
            setClubs(response.data.response);
        } catch (error) {
            console.error("Error fetching clubs:", error);
        } finally {
            setLoadingClubs(false);
        }
    };

    useEffect(() => {
        if (countryInput) {
            const timeoutId = setTimeout(() => {
                fetchCountries(countryInput);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [countryInput]);

    useEffect(() => {
        if (clubInput) {
            const timeoutId = setTimeout(() => {
                fetchClubs(clubInput);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [clubInput, selectedCountry]);

    return {
        countries,
        clubs,
        loadingCountries,
        loadingClubs,
        countryInput,
        setCountryInput,
        clubInput,
        setClubInput,
        setClubs,
    };
};

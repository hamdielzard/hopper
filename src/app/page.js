"use client";
import Button from "@/components/Button";
import {useEffect, useState} from "react";
import TracerouteMap from "@/components/TracerouteMap";
import Hop from "@/components/Hop";

export default function Home() {

    // Modal states
    const [newModal, setNewModal] = useState(false)
    const [aboutModal, setAboutModal] = useState(false)
    const [importModal, setImportModal] = useState(false)
    const [settingsModal, setSettingsModal] = useState(false)

    // Debug only
    const [mapState, setMapState] = useState(true) // DEBUG only: Disable and enable map for testing speed

    // Data related
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("Loading...")
    const [tracerouteData, setTracerouteData] = useState([])
    const [targetAddr, setTargetAddr] = useState("")
    const [notification, setNotification] = useState("")


    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification("") // Clear the notification after 5 seconds
            }, 5000)
        }
    }, [notification]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="flex flex-row gap-1.5 items-center w-screen pl-8">
                <h1 className={`text-5xl font-bold text-center hover:text-cyan-200 
                transition ease-in-out duration-200 pr-5`}>
                    Hopper
                </h1>
                <Button text={"New"} disabled={false} onClick={toggleNewModal}/>
                <Button text={"Import"} disabled={false} onClick={toggleImportModal}/>
                <Button text={"Save"} disabled={(tracerouteData.length === 0)} onClick={saveTracert}/>
                <Button text={"Clear"} disabled={(tracerouteData.length === 0)} onClick={clearTracert}/>
                <Button text={"About"} disabled={false} onClick={toggleAboutModal}/>
            </div>
            <div id="mainView" className={`flex flex-row items-center justify-between w-screen px-10 gap-10`}>
                {mapState ? (
                    tracerouteData.length > 0 ? (
                        <TracerouteMap markers={tracerouteData}/>
                    ) : (
                        <TracerouteMap/>

                    )
                ) : (<div className={`text-4xl text-red-500`}>Map Disabled</div>)}
                <div id="mainSideView" className={`flex flex-col items-center h-[80vh] bg-slate-700 w-full 
                max-w-[30%] p-5 rounded-[25px] border-2 overflow-x-hidden overflow-y-scroll 
                ${tracerouteData.length > 0 ? `border-cyan-400 justify-start` : `border-red-400 justify-center`}`}>
                    {tracerouteData.length > 0 ?
                        (<div className={`flex flex-col items-center justify-center w-full gap-3 `}>
                            <h1 className={`text-3xl text-cyan-500`}>Completed Traceroute</h1>
                            <div className={`flex flex-col items-center w-full gap-3 `}>
                                {tracerouteData.map((hop, index) => (
                                    <Hop key={index} ipAddr={hop.ipAddr} city={hop.city} country={hop.country}
                                         countryCode={hop.countryCode} lat={hop.lat} lon={hop.lon} hop={hop.hop}
                                         ping={hop.ping}/>
                                ))}
                            </div>
                        </div>)
                        :
                        (<div className={`flex flex-col items-center justify-center`}>
                            <h1 className={`text-3xl text-red-500`}>No Data Available</h1>
                            <p className={`text-amber-200`}>Start by creating a new traceroute</p>
                        </div>)
                    }
                </div>
            </div>
            <div id="statusBar" className={`flex flex-row gap-3 items-center w-screen py-0 h-3`}>
                <p className="flex-row items-start pl-8 text-cyan-200 font-medium font-mono"> Ready &gt;</p>

                {newModal && (
                    <div id="new-modal-content" className={`flex flex-row gap-2 items-center`}>
                        <h1 className={`font-mono text-cyan-500`}>New Traceroute</h1>
                        <input autoFocus id="newTracertValue" type="text"
                               className={'text-amber-50 font-mono bg-slate-700'}
                               placeholder="IP or Hostname"
                               onKeyDown={(event) => {
                                   if (event.key === 'Enter') {
                                       console.log("Create")
                                       newTracert()
                                   }
                                   if (event.key === 'Escape') {
                                       toggleNewModal()
                                   }
                               }}/>
                        <Button text={"Create"} disabled={false} hotkey={`Enter`} onClick={newTracert}/>
                        <Button text={"Cancel"} disabled={false} onClick={toggleNewModal} hotkey={`ESC`}/>
                    </div>
                )}
                {aboutModal && (
                    <div id="about-modal-content" className={`flex flex-row gap-2 items-center`}>
                        <h1 className={`font-mono text-cyan-500`}>About</h1>
                        <p className={`font-mono`}>About modal opened</p>
                        <Button text={"Close"} disabled={false} onClick={toggleAboutModal}/>
                    </div>
                )}
                {importModal && (
                    <div id="import-modal-content" className={`flex flex-row gap-2 items-center`}>
                        <h1 className={`font-mono text-cyan-500`}>Import</h1>
                        <p className={`font-mono`}>Import an existing traceroute performed</p>
                        <input id={`fileSelector`} hidden type="file" accept=".json" onChange={importTracert}/>
                        <Button text={"Import File"} disabled={false} onClick={() => (
                            document.getElementById("fileSelector").click()
                        )}/>
                        <Button text={"Close"} disabled={false} onClick={toggleImportModal}/>
                    </div>
                )}
                {settingsModal && (
                    <div id="settings-modal-content" className={`flex flex-row gap-2 items-center`}>
                        <h1 className={`font-mono text-cyan-500`}>Settings</h1>
                        <p className={`font-mono`}>Adjust settings for Hopper</p>
                        <Button text={"Open Settings"} disabled={true} onClick={toggleSettingsModal}/>
                        <Button text={"Close"} disabled={false} onClick={toggleSettingsModal}/>
                    </div>
                )}
            </div>
            {/* Loading Overlay */}
            {loading && (
                <div id={`blackOverlay`} className={`bg-black opacity-75 fixed top-0 w-full h-full z-10`}>
                    <div id={`loadingSpinner`}
                         className={`flex flex-col items-center justify-center w-lvw h-lvh gap-3`}>
                        <h1 className={`font-sans text-3xl text-cyan-500`}>{loadingText}</h1>
                        <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 `}/>
                        <div className={`flex flex-col gap-1`}>
                            <Button text={"Cancel"} disabled={false} onClick={() => {
                                // refresh page
                                window.location.reload()
                            }}/>
                        </div>
                    </div>
                </div>)
            }
            {/* Notification Toast */}
            {notification && (
                <div id={`notificationToast`}
                     className={`fixed bottom-5 right-5 bg-slate-700 text-amber-50 p-5 rounded-lg shadow-lg border-slate-300 border-2`}>
                    <p className={`font-mono`}>{notification}</p>
                </div>
            )}
            {/* About Box */}
            {aboutModal && (
                <div id={`blackOverlay`} className={`bg-black opacity-75 fixed top-0 w-full h-full z-10`}>
                    <div id={`loadingSpinner`}
                         className={`flex flex-col items-center justify-center w-lvw h-lvh gap-3`}>
                        <div className={`flex flex-col items-center justify-center bg-slate-900 p-10 border-2 border-cyan-200 rounded-3xl`}>
                            <img src={`/img/favicon.ico`} alt={`Hopper Logo`} className={`w-32 h-32`}/>
                            <h1 className={`font-sans text-3xl text-cyan-500`}>About Hopper</h1>
                            <p className={`font-sans text-amber-50`}>
                                Hopper is a traceroute visualizer that allows you to see the path your data takes across
                                the
                                internet.
                            </p>
                            <p className={`font-sans text-amber-50`}>
                                Hopper is built using Next.js, React, and TailwindCSS.
                            </p>
                            <p className={`font-sans text-amber-200`}>Developed by Hamdi Elzard</p>
                            <p className={`font-sans text-amber-200`}>2024</p>
                            <div className={`flex flex-col gap-1`}>
                                <Button text={"Close"} disabled={false} onClick={toggleAboutModal}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );

    // Modal functions
    function toggleNewModal() {
        if (aboutModal) {
            setAboutModal(!aboutModal)
        }
        if (importModal) {
            setImportModal(!importModal)
        }
        if (settingsModal) {
            setSettingsModal(!settingsModal)
        }
        setNewModal(!newModal)
    }

    function toggleAboutModal() {
        if (newModal) {
            setNewModal(!newModal)
        }
        if (importModal) {
            setImportModal(!importModal)
        }
        if (settingsModal) {
            setSettingsModal(!settingsModal)
        }
        setAboutModal(!aboutModal)
    }

    function toggleImportModal() {
        if (newModal) {
            setNewModal(!newModal)
        }
        if (aboutModal) {
            setAboutModal(!aboutModal)
        }
        if (settingsModal) {
            setSettingsModal(!settingsModal)
        }
        setImportModal(!importModal)
    }

    function toggleSettingsModal() {
        if (newModal) {
            setNewModal(!newModal)
        }
        if (aboutModal) {
            setAboutModal(!aboutModal)
        }
        if (importModal) {
            setImportModal(!importModal)
        }
        setSettingsModal(!settingsModal)
    }

    function toggleLoading() {
        setLoading(!loading) // DEBUG only: Disable and enable loading for testing UI
    }

    // Debug Level Functions
    function toggleMapState() {
        setMapState(!mapState) // DEBUG only: Disable and enable map for testing speed
    }


    /**
     * Perform a new traceroute
     */
    async function newTracert() {
        // === SETUP ===

        // Set loading text
        setLoadingText("Performing traceroute...")
        // Get target value
        const target = document.getElementById("newTracertValue").value
        setTargetAddr(target);

        // Clear existing traceroute data
        setTracerouteData([])
        // Set loading state
        setLoading(true)

        // === PERFORM TRACEROUTE ===

        // Perform traceroute
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "target": target
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let output = [];
        await fetch("api/traceroute", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                output = JSON.parse(result)
            })
            .catch((error) => console.error(error));

        let result = [];
        // === PARSE DATA ===
        setLoadingText("Parsing data...")
        if (output.message === "Completed") {
            for (let i = 0; i < output.hops.length; i++) {
                let hop = output.hops[i];
                let hopTarget = hop.ip;
                let hopRTT = hop.rtt1;
                let hopCount = hop.hop;
                result.push({
                    ipAddr: hopTarget,
                    city: "City",
                    country: "Country",
                    countryCode: "CA",
                    lat: 0,
                    lon: 0,
                    hop: hopCount,
                    ping: hopRTT,
                    timestamp: Date.now()
                })
            }
        }
        else {
            setNotification("Traceroute failed: " + output.message)
            setLoadingText("Loading...")
            setLoading(false)
        }

        // === GET IP GEOLOCATION ===
        await getGeolocation(result)

        // === COMPLETED ===
        setLoadingText("Finalizing...")
        // Set loading state
        setLoading(false)
        // Set loading text
        setLoadingText("Loading...")
        // Set traceroute data
        await setData(result)

        setNotification(`Traceroute to ${target} completed`)

    }

    /**
     * Get geolocation data for each hop in the traceroute
     * @param result - Traceroute data from the API
     */
    async function getGeolocation(result){
        setLoadingText("Getting geolocation data...")
        for (let i = 0; i < result.length; i++) {
            let ip = result[i].ipAddr;
            if (ip !== "*"){
                let url = `https://ipapi.co/${ip}/json/`;
                let response = await fetch(url);
                let data = await response.json();
                result[i].city = data.city;
                result[i].country = data.country_name;
                result[i].countryCode = data.country;
                result[i].lat = data.latitude;
                result[i].lon = data.longitude;
            }
            else {
                result[i].city = null;
                result[i].country = null;
                result[i].countryCode = null;
                result[i].lat = null;
                result[i].lon = null;
            }
        }
    }

    /**
     * Set the traceroute data in the state
     * @param data
     */
    async function setData(data){
        await setTracerouteData(data);
        console.log("Data set to ", tracerouteData)
    }

    /**
     * Handles saving the traceroute data to a file
     * Format will be in JSON identical to the traceroute data
     */
    function saveTracert() {
        // Save traceroute data to a file
        // Download the traceroute data as a file
        if(tracerouteData.length > 0){
            const element = document.createElement("a");
            const file = new Blob([JSON.stringify(tracerouteData)], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "traceroute.json";
            document.body.appendChild(element); // Required for this to work in FireFox

            element.click();
            setNotification("Data downloaded")

            // Remove the element

            document.body.removeChild(element);
        }
        else {
            setNotification("No data to save")

        }
    }

    /**
     * Clear the traceroute data from the state
     */
    function clearTracert() {
        setTracerouteData([])
        setNotification("Data cleared")
    }

    /**
     * Import a traceroute file and re-fetch the geolocation data
     */
    async function importTracert() {
        setLoading(true)
        setLoadingText("Importing traceroute data...")
        // Open a file dialog to import a traceroute file
        const file = document.getElementById("fileSelector").files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            try{
                const data = JSON.parse(contents);
                if(data !== {}){
                    try {
                        if(data[0].ipAddr && data[0].hop && data[0].ping && data[0].timestamp){
                            setTracerouteData(data)
                        }
                        else {
                            setNotification("Invalid file format")
                        }
                    }
                    catch (e) {
                        setNotification("Invalid file format")
                    }
                }
                else {
                    setNotification("No data in file")
                }
            }
            catch (e) {
                setNotification("Invalid JSON file");
            }
        }
        reader.readAsText(file);

        await getGeolocation(tracerouteData)
        setNotification(`File imported: ${file.name}`)
        setLoading(false)
        setLoadingText("Loading...")
        toggleImportModal()

    }
}

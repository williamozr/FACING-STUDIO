import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Navbar, Alignment, NavbarDivider, Alert } from "@blueprintjs/core";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "polotno/utils/styled";
import { useProject } from "../project";
import { FileMenu } from "./file-menu";
import { DownloadButton } from "./download-button";

const NavbarContainer = styled("div")`
    @media screen and (max-width: 500px) {
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100vw;
    }
`;

const NavInner = styled("div")`
    @media screen and (max-width: 500px) {
        display: flex;
    }
`;

export default observer(({ store, onLogout }) => {
    const project = useProject();

    const {
        loginWithPopup,
        isLoading,
        getAccessTokenSilently,
        isAuthenticated,
        logout,
    } = useAuth0();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [isLogoutConfirmationOpen, setLogoutConfirmationOpen] =
        useState(false);

    const onLogoutp = () => {
        setLogoutConfirmationOpen(true); 
    };

    const confirmLogout = () => {
        onLogout();
        setLogoutConfirmationOpen(false);
    };

    return (
        <NavbarContainer className="bp4-navbar">
            <NavInner>
                <Navbar.Group align={Alignment.LEFT}>
                    <FileMenu store={store} project={project} />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <NavbarDivider />
                    <DownloadButton store={store} />
                    <button className="btn-primary btn" onClick={onLogoutp}>
                        {" "}
                        Salir{" "}
                    </button>
                    {/* Confirmation modal */}
                    <Alert
                        isOpen={isLogoutConfirmationOpen}
                        onClose={() => setLogoutConfirmationOpen(false)}
                        cancelButtonText="Cancel"
                        confirmButtonText="Logout"
                        intent="danger"
                        icon="log-out"
                        onCancel={() => setLogoutConfirmationOpen(false)}
                        onConfirm={confirmLogout}
                    >
                        <p>¿En realidad desea cerrar su sesión?</p>
                    </Alert>
                </Navbar.Group>
            </NavInner>
        </NavbarContainer>
    );
});


import React from "react";
import { observer } from "mobx-react-lite";
import {
    Button,
    Dialog,
    Classes,
    Position,
    Menu,
    MenuItem,
    MenuDivider,
    Alert,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { downloadFile } from "polotno/utils/download";

export const FileMenu = observer(({ store, project }) => {
    const inputRef = React.useRef();

    const [faqOpened, toggleFaq] = React.useState(false);
    const [isNewProjectConfirmationOpen, setNewProjectConfirmationOpen] =
        React.useState(false);

    const createNewProject = () => {
        const ids = store.pages
            .map((page) => page.children.map((child) => child.id))
            .flat();
        const hasObjects = ids?.length;
        if (hasObjects) {
            setNewProjectConfirmationOpen(true);
        } else {
            performCreateNewProject();
        }
    };
    const performCreateNewProject = () => {
        const pagesIds = store.pages.map((p) => p.id);
        store.deletePages(pagesIds);
        store.addPage();
        project.id = "";
        project.save();
    };

    return (
        <>
            <Popover2
                content={
                    <Menu>
                        <MenuItem
                            icon="plus"
                            text="Crear nuevo proyecto"
                            onClick={() => {
                                createNewProject();
                            }}
                        />
                        <MenuDivider />
                        <MenuItem
                            icon="folder-open"
                            text="Abrir"
                            onClick={() => {
                                document.querySelector("#load-project").click();
                            }}
                        />
                        <MenuItem
                            icon="floppy-disk"
                            text="Guardar como"
                            onClick={() => {
                                const json = store.toJSON();

                                const url =
                                    "data:text/json;base64," +
                                    window.btoa(
                                        unescape(
                                            encodeURIComponent(
                                                JSON.stringify(json)
                                            )
                                        )
                                    );

                                downloadFile(url, "polotno.json");
                            }}
                        />

                        <MenuDivider />
                        <MenuItem
                            text="Acerca de FACING STUDIO"
                            icon="info-sign"
                            onClick={() => {
                                toggleFaq(true);
                            }}
                        />
                    </Menu>
                }
                position={Position.BOTTOM_RIGHT}
            >
                <Button minimal text="Archivo" />
            </Popover2>
            <input
                type="file"
                id="load-project"
                accept=".json,.polotno"
                ref={inputRef}
                style={{ width: "180px", display: "none" }}
                onChange={(e) => {
                    var input = e.target;

                    if (!input.files.length) {
                        return;
                    }

                    var reader = new FileReader();
                    reader.onloadend = function () {
                        var text = reader.result;
                        let json;
                        try {
                            json = JSON.parse(text);
                        } catch (e) {
                            alert("Can not load the project.");
                        }

                        if (json) {
                            store.loadJSON(json);
                            input.value = "";
                        }
                    };
                    reader.onerror = function () {
                        alert("Can not load the project.");
                    };
                    reader.readAsText(input.files[0]);
                }}
            />
            <Dialog
                icon="info-sign"
                onClose={() => toggleFaq(false)}
                title="A Cerca de FACING STUDIO"
                isOpen={faqOpened}
                style={{
                    width: "80%",
                    maxWidth: "700px",
                }}
            >
                <div className={Classes.DIALOG_BODY}>
                    <h2>Que es FACING STUDIO?</h2>
                    <p>
                        <strong>FACING STUDIO </strong> - Es una aplicación web
                        para crear diseños gráficos. Puedes mezclar imagen,
                        texto e ilustraciones para hacer publicaciones en redes
                        sociales, vistas previas de YouTube, portadas de
                        podcasts, tarjetas de presentación y presentaciones.
                    </p>
                    <p>
                        FACING STUDIO se basa en Polotno SDK para proporcionar
                        una experiencia similar a la de una aplicación como
                        Canva, de manera gratuita y ágil.
                    </p>
                    <h2>Para qué se creó FACING STUDIO?</h2>
                    <p>
                        FACING STUDIO se creó para dar agilidad a los procesos
                        de difusión de información que es emitida desde las
                        distintas dependencias de la Facultad de Ingeniería. La
                        finalidad de FACING STUDIO es que cualquiera con minimos
                        conocimientos en Diseño Gráfico pueda crear fichas
                        publicitarias para ser compartidas en redes sociales o
                        puedan ser usadas a disposición de quien las crea como
                        le sea conveniente.
                    </p>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={() => toggleFaq(false)}>Cerrar</Button>
                    </div>
                </div>
            </Dialog>
            {/* Confirmation modal for creating a new project */}
            <Alert
                isOpen={isNewProjectConfirmationOpen}
                onClose={() => setNewProjectConfirmationOpen(false)}
                cancelButtonText="Cancel"
                confirmButtonText="Create"
                intent="danger"
                icon="trash"
                onCancel={() => setNewProjectConfirmationOpen(false)}
                onConfirm={() => {
                    performCreateNewProject();
                    setNewProjectConfirmationOpen(false); // Close the confirmation modal
                }}
            >
                <p>
                    ¿Desea eliminar todo el contenido para crear un nuevo diseño?
                </p>
            </Alert>
        </>
    );
});
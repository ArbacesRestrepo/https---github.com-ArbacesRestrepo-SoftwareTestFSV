
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Pruebas app WEB FSV', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.fixture('LoginFsv').as('datosJsonLogin');
  })


  it('Suscripción de un contrato de prevision FSV', function () {
    cy.fixture('LoginFsv').then((data) => {
      // 2. INTERCEPTAR: Escuchamos la petición de la API ANTES de que ocurra el clic
      // Reemplaza '/api/login' por la URL real a la que viajan tus datos
      cy.intercept('POST', 'https://auroraservicetest.funerariasanvicente.co/api/auth/login').as('peticionLogin');

      cy.visit('https://aurorasanbox.funerariasanvicente.co/login')
      cy.get('#usuario').type(data.identifier);
      cy.get('#clave').type(data.password);
      cy.get('button[type="submit"]').click();

      // 5. CAPTURA: Esperamos a que la petición termine y obtenemos la respuesta
      cy.wait('@peticionLogin').then((interception) => {
        // Aquí tienes toda la respuesta del servidor
        const respuestaServidor = interception.response.body;

        // Puedes ver los datos en la consola del navegador para inspeccionarlos
        cy.log('log', JSON.stringify(respuestaServidor));

        // 6. VALIDACIÓN (Opcional): Validar que la respuesta contenga lo que esperas

        cy.task('log', respuestaServidor);
        expect(interception.response.statusCode).to.equal(201);
        expect(respuestaServidor).to.have.property('token');


        cy.fixture('Contrato').then((data) => {
          cy.visit('https://aurorasanbox.funerariasanvicente.co/vista-inicial');

          cy.get('div.menu-4')
            .find('.submenu-4 .submenu-text')
            .click({ force: true });

          cy.visit('https://aurorasanbox.funerariasanvicente.co/prevision/contratos-virtuales/listar-contratos-virtuales');

          cy.get('button[type="button"]').click();

          cy.get('form').within(() => {
            cy.contains('label', 'Tipo de Protección', { timeout: 10000 })
              .closest('section')
              .within(() => {

                cy.task('log', data.contract.protectionType);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="protectionType"]')
                  .select(data.contract.protectionType, { force: true });

                cy.task('log', data.contract.affiliationType);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="affiliationType"]')
                  .select(data.contract.affiliationType, { force: true });

              });

            cy.contains('label', 'Tipo de Titular', { timeout: 10000 })
              .closest('section')
              .within(() => {
                cy.task('log', data.titular.typeBeneficiary);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="typeBeneficiary"]')
                  .select(data.titular.typeBeneficiary, { force: true });

                cy.task('log', data.titular.identifier);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="identification"]')
                  .clear({ force: true }).type(data.titular.identifier, { force: true });

                cy.task('log', data.titular.typeIdentification);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="typeIdentification"]')
                  .select(data.titular.typeIdentification, { force: true });

                cy.task('log', data.titular.lastName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="lastName"]')
                  .clear({ force: true }).type(data.titular.lastName, { force: true });

                cy.task('log', data.titular.secondLastName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="secondLastName"]')
                  .clear({ force: true }).type(data.titular.secondLastName, { force: true });

                cy.task('log', data.titular.firstName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="firstName"]')
                  .clear({ force: true }).type(data.titular.firstName, { force: true });

                cy.task('log', data.titular.secondName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="secondName"]')
                  .clear({ force: true }).type(data.titular.secondName, { force: true });

                cy.task('log', data.titular.gender);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="gender"]')
                  .select(data.titular.gender, { force: true });

                cy.task('log', data.titular.birthDate);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="birthDate"]')
                  .clear({ force: true }).type(data.titular.birthDate, { force: true });

                cy.task('log', data.titular.maritalStatusCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="maritalStatusCode"]')
                  .select(data.titular.maritalStatusCode, { force: true });

                cy.task('log', data.titular.departmentCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceDepartment"]')
                  .select(data.titular.departmentCode, { force: true })
                  .trigger('change', { force: true });

                cy.task('log', data.titular.municipalityCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceMunicipality"]')
                  .select(data.titular.municipalityCode, { force: true })
                  .trigger('change', { force: true });

                cy.task('log', data.titular.zoneCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceZone"]')
                  .select(data.titular.zoneCode, { force: true })
                  .trigger('change', { force: true });

/*                 cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceNeighborhood"]')
                  .select(data.titular.neighborhoodCode, { force: true })
                  .trigger('change', { force: true });
 */                
                cy.task('log', data.titular.address);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="residenceAddress"]')
                  .clear({ force: true }).type(data.titular.address, { force: true });

                cy.task('log', data.titular.phone);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="residencePhone"]')
                  .clear({ force: true }).type(data.titular.phone, { force: true });

                cy.task('log', data.titular.mobile);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="mobile"]')
                  .clear({ force: true }).type(data.titular.mobile, { force: true });

                cy.task('log', data.titular.email);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="email"]')
                  .clear({ force: true }).type(data.titular.email, { force: true });

                cy.task('log', data.titular.job);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="job"]')
                  .clear({ force: true }).type(data.titular.job, { force: true });

                cy.task('log', data.titular.phoneJob);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="jobPhone"]')
                  .clear({ force: true }).type(data.titular.phoneJob, { force: true });

                /*                 cy.get('div.grid')
                                  .find('div.space-y-1')
                                  .find('[formcontrolname="collectionAddress"]')
                                  .clear({ force: true }).type( data.titular.collectionAddress, { force: true });
                 */
              })
          })


        });

        cy.intercept('POST', 'https://auroraservicetest.funerariasanvicente.co/api/virtual-contracts').as('crearContratoVirtual');

        cy.get('button[type="submit"]').click({ force: true });

        /*         cy.wait('@crearContratoVirtual').then((interception) => {
                  const respuestaContrato = interception.response.body;
                  cy.log('log', JSON.stringify(respuestaContrato));
                  cy.task('log', respuestaContrato);
                  expect(interception.response.statusCode).to.equal(201);
                  expect(respuestaContrato).to.have.property('contractId');
                });
         */

      });
    });
  });

  it('Suscripción de un contrato de prevision FSV Login Falso', function () {
    cy.fixture('LoginFsvFalso').then((data) => {
      // 2. INTERCEPTAR: Escuchamos la petición de la API ANTES de que ocurra el clic
      // Reemplaza '/api/login' por la URL real a la que viajan tus datos
      cy.intercept('POST', 'https://auroraservicetest.funerariasanvicente.co/api/auth/login').as('peticionLogin');

      cy.visit('https://aurorasanbox.funerariasanvicente.co/login')
      cy.get('#usuario').type(data.identifier);
      cy.get('#clave').type(data.password);
      cy.get('button[type="submit"]').click();

      // 5. CAPTURA: Esperamos a que la petición termine y obtenemos la respuesta
      cy.wait('@peticionLogin').then((interception) => {
        // Aquí tienes toda la respuesta del servidor
        const respuestaServidor = interception.response.body;

        // Puedes ver los datos en la consola del navegador para inspeccionarlos
        cy.log('log', JSON.stringify(respuestaServidor));

        // 6. VALIDACIÓN (Opcional): Validar que la respuesta contenga lo que esperas

        cy.task('log', respuestaServidor);
        expect(interception.response.statusCode).to.equal(201);
        expect(respuestaServidor).to.have.property('token');


        cy.fixture('Contrato').then((data) => {
          cy.visit('https://aurorasanbox.funerariasanvicente.co/vista-inicial');

          cy.get('div.menu-4')
            .find('.submenu-4 .submenu-text')
            .click({ force: true });

          cy.visit('https://aurorasanbox.funerariasanvicente.co/prevision/contratos-virtuales/listar-contratos-virtuales');

          cy.get('button[type="button"]').click();

          cy.get('form').within(() => {
            cy.contains('label', 'Tipo de Protección', { timeout: 10000 })
              .closest('section')
              .within(() => {

                cy.task('log', data.contract.protectionType);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="protectionType"]')
                  .select(data.contract.protectionType, { force: true });

                cy.task('log', data.contract.affiliationType);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="affiliationType"]')
                  .select(data.contract.affiliationType, { force: true });

              });

            cy.contains('label', 'Tipo de Titular', { timeout: 10000 })
              .closest('section')
              .within(() => {
                cy.task('log', data.titular.typeBeneficiary);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="typeBeneficiary"]')
                  .select(data.titular.typeBeneficiary, { force: true });

                cy.task('log', data.titular.identifier);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="identification"]')
                  .clear({ force: true }).type(data.titular.identifier, { force: true });

                cy.task('log', data.titular.typeIdentification);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="typeIdentification"]')
                  .select(data.titular.typeIdentification, { force: true });

                cy.task('log', data.titular.lastName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="lastName"]')
                  .clear({ force: true }).type(data.titular.lastName, { force: true });

                cy.task('log', data.titular.secondLastName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="secondLastName"]')
                  .clear({ force: true }).type(data.titular.secondLastName, { force: true });

                cy.task('log', data.titular.firstName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="firstName"]')
                  .clear({ force: true }).type(data.titular.firstName, { force: true });

                cy.task('log', data.titular.secondName);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="secondName"]')
                  .clear({ force: true }).type(data.titular.secondName, { force: true });

                cy.task('log', data.titular.gender);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="gender"]')
                  .select(data.titular.gender, { force: true });

                cy.task('log', data.titular.birthDate);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="birthDate"]')
                  .clear({ force: true }).type(data.titular.birthDate, { force: true });

                cy.task('log', data.titular.maritalStatusCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="maritalStatusCode"]')
                  .select(data.titular.maritalStatusCode, { force: true });

                cy.task('log', data.titular.departmentCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceDepartment"]')
                  .select(data.titular.departmentCode, { force: true })
                  .trigger('change', { force: true });

                cy.task('log', data.titular.municipalityCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceMunicipality"]')
                  .select(data.titular.municipalityCode, { force: true })
                  .trigger('change', { force: true });

                cy.task('log', data.titular.zoneCode);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('select[formcontrolname="residenceZone"]')
                  .select(data.titular.zoneCode, { force: true })
                  .trigger('change', { force: true });

                /*                 cy.get('div.grid')
                                  .find('div.space-y-1')
                                  .find('select[formcontrolname="residenceNeighborhood"]')
                                  .select(data.titular.neighborhoodCode, { force: true })
                                  .trigger('change', { force: true });
                
                 */
                cy.task('log', data.titular.address);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="residenceAddress"]')
                  .clear({ force: true }).type(data.titular.address, { force: true });

                cy.task('log', data.titular.phone);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="residencePhone"]')
                  .clear({ force: true }).type(data.titular.phone, { force: true });

                cy.task('log', data.titular.mobile);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="mobile"]')
                  .clear({ force: true }).type(data.titular.mobile, { force: true });

                cy.task('log', data.titular.email);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="email"]')
                  .clear({ force: true }).type(data.titular.email, { force: true });

                cy.task('log', data.titular.job);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="job"]')
                  .clear({ force: true }).type(data.titular.job, { force: true });

                cy.task('log', data.titular.phoneJob);
                cy.get('div.grid')
                  .find('div.space-y-1')
                  .find('[formcontrolname="jobPhone"]')
                  .clear({ force: true }).type(data.titular.phoneJob, { force: true });

                /*                 cy.get('div.grid')
                                  .find('div.space-y-1')
                                  .find('[formcontrolname="collectionAddress"]')
                                  .clear({ force: true }).type( data.titular.collectionAddress, { force: true });
                 */
              })
          })


        });

        cy.intercept('POST', 'https://auroraservicetest.funerariasanvicente.co/api/virtual-contracts').as('crearContratoVirtual');

        cy.get('button[type="submit"]').click({ force: true });

        /*         cy.wait('@crearContratoVirtual').then((interception) => {
                  const respuestaContrato = interception.response.body;
                  cy.log('log', JSON.stringify(respuestaContrato));
                  cy.task('log', respuestaContrato);
                  expect(interception.response.statusCode).to.equal(201);
                  expect(respuestaContrato).to.have.property('contractId');
                });
         */

      });
    });
  });


});

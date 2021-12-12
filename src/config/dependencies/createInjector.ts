import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { RodadaRepository } from "../../repositories/RodadaRepository";
import { PartidaRepository } from "../../repositories/PartidaRepository";
import { EnderecoRepository } from "../../repositories/EnderecoRepository";
import { CampeonatoRepository } from "../../repositories/CampeonatoRepository";
import { ApostaRepository } from "../../repositories/ApostaRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UsuarioController";
import "../../controllers/EnderecoController";
import "../../controllers/RodadaController";
import "../../controllers/TimeController";
import "../../controllers/CampeonatoController";
import "../../controllers/ApostaController";

// inicializa services
import "../../services/UsuarioService";
import "../../services/EnderecoService";
import "../../services/RodadaService";
import "../../services/TimeService";
import "../../services/CampeonatoService";
import "../../services/ApostaService";

// inicializa clientes
import "../../clients/CepClient";
import "../../infra/http/AxiosHttpClient";
import "../../clients/BrasileiraoClient";

const createDependencyInjector = () => {
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
  Container.set("RodadaRepository", getCustomRepository(RodadaRepository));
  Container.set("PartidaRepository", getCustomRepository(PartidaRepository));
  Container.set("EnderecoRepository", getCustomRepository(EnderecoRepository));
  Container.set(
    "CampeonatoRepository",
    getCustomRepository(CampeonatoRepository)
  );
  Container.set("ApostaRepository", getCustomRepository(ApostaRepository));
};

export default createDependencyInjector;

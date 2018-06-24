var calculadora = {

    pantalla: document.getElementById('display'),
    resultado:0,
    ultimoOperando:0,
    tipoOperacion:0,
    operacion: false,

    init: function () {
        this.activarTeclas();
    },

    activarTeclas:function () {
        self = this;
        tecla = document.getElementsByClassName('tecla');
        for (i=0;i<tecla.length;i++){
            tecla[i].addEventListener('mousedown',self.presionarTecla.bind(self));
            tecla[i].addEventListener('mouseup',self.soltarTecla.bind(self));
            tecla[i].addEventListener('mouseout',self.soltarTecla.bind(self));
        }
    },

    presionarTecla:function (event) {
        var estado = this.revisaPantalla();
        event.target.style.transform = "scale(0.9,0.9)";
        this.revisaTecla(event);
    },

    soltarTecla: function (event) {
        event.target.style.transform = "scale(1,1)";
    },

    revisaPantalla:function () {
            if ((this.pantalla.innerHTML == "0")) {
                return true;
            } else {
                return false;
            }
    },

    revisaTecla:function (event) {
        var op = self.pantalla.innerHTML;
        self = this;
        var automatica;
        var estadoPantalla = self.revisaPantalla();
        var teclaPresionada = event.target.id;
        switch (teclaPresionada) {
            case 'on':
                self.pantalla.innerHTML = 0;
                self.operacion = false;
                self.resultado = 0;
                break;
            case 'sign':
                automatica = self.Signo(op);
                self.pantalla.innerHTML = automatica;
                break;
            case 'raiz':
                automatica = self.calcularRaiz(op);
                self.pantalla.innerHTML = automatica;
                break;
            case 'dividido':
                self.operar(op,1);
                break;
            case 'por':
                self.operar(op,2);
                break;
            case 'menos':
                self.operar(op,3);
                break;
            case 'mas':
                self.operar(op,4);
                break;
            case 'punto':
                    if(!self.buscaPunto(op)){
                        if(self.pantalla.innerHTML==""){
                            self.pantalla.innerHTML = self.pantalla.innerHTML + "0.";
                        }else
                        self.pantalla.innerHTML = self.pantalla.innerHTML + ".";
                    }
                break;
            case 'igual':
                self.resultado = self.realizarMat(op);
                self.pantalla.innerHTML = self.resultado;
                break;
            default:
                if(!this.buscaPunto(op)) {
                    if (self.pantalla.innerHTML.length <8) {
                        if (estadoPantalla) {
                            if (event.target.id != 0) {
                                self.pantalla.innerHTML = event.target.id;
                            }
                        } else {
                            self.pantalla.innerHTML = self.pantalla.innerHTML + event.target.id;
                        }
                    }
                }else {
                    if (self.pantalla.innerHTML.length <=8) {
                        if (estadoPantalla) {
                            if (event.target.id != 0) {
                                self.pantalla.innerHTML = event.target.id;
                            }
                        } else {
                            self.pantalla.innerHTML = self.pantalla.innerHTML + event.target.id;
                        }
                    }
                }
                break;
        }

    },

    calcularRaiz:function (op) {
        op = Math.pow(op,0.5);
        if(isNaN(op)){
            alert("No se puede obtener raiz cuadrada de un numero negativo");
            op = 0;
        }
        op = this.revisaLargo(op);
        return op;
    },

    revisaLargo:function(resul) {
        resul = resul.toString();
        if (this.buscaPunto(resul)) {
            if (resul.length > 9) {
                resul = resul.substr(0, 9);
            } else resul = resul.substr(0, 8);
        } else {
            if (resul.length <= 8) {
                resul = resul.substr(0, 8);
            } else {
                alert("El resultado es mayor que el numero de digitos soportado por la calculadora " +
                    "y no se puede mostrar. Solo se estan mostrando los primeros 8 digitos. \nPor favor realice calculos cuyo resultado tenga maximo 8 digitos");
                resul = resul.substr(0, 8);;
            }
        }
        return resul;
    },

    Signo:function (op) {
        op = parseFloat(op)*(-1);
        return op;
    },

    operar:function (operando,tipoDeOperacion) {
        this.resultado = operando;
        this.pantalla.innerHTML = "";
        this.tipoOperacion = tipoDeOperacion;
        this.operacion = false;
    },

    buscaPunto:function (cadena) {
        var x = cadena.indexOf(".");
        if(x != -1){
            return true;
        }else return false
    },
    realizarMat:function (operando) {
        var resul=0;
        if(!this.operacion) {
            this.ultimoOperando = operando;
        }
        switch (this.tipoOperacion){
            case 1:
                if(this.ultimoOperando != 0){
                resul = parseFloat(this.resultado) / parseFloat(this.ultimoOperando);
                }else if(this.ultimoOperando == 0){
                    alert("La division entre el numero \"0\" no esta permitida. Por favor intente realizar la operacion nuevamente");
                    resul=0;
                }
                break;
            case 2:
                resul = parseFloat(this.resultado) * parseFloat(this.ultimoOperando);
                break;
            case 3:
                resul = parseFloat(this.resultado) - parseFloat(this.ultimoOperando);
                break;
            case 4:
                resul = parseFloat(this.resultado) + parseFloat(this.ultimoOperando);
                break;
        }
        resul = this.revisaLargo(resul);
        this.operacion = true;
        return resul;
    }

};
calculadora.init();
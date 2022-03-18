package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;


import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import android.os.Build;//para obtener el nombre del dispositivo
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    String nombre_Dispositivo;   //string para obtener el nombre del dispositivo
    private TextView tvNombreDispositivo;//TexView para monitorear

    //parametros del broker la siguiente variable con el broker de shiftr.io
    static String MQTTHOST = "tcp://broker.shiftr.io"; //el broker
    static String USERNAME = "accesobroker";//el token de acceso
    static String PASSWORD = "zxcvbnmz";    //la contraceña del token
    MqttAndroidClient client;  //  clienteMQTT este dispositivo

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        obtener_nombre_Dispositivo();
        conexionBroker();

    }

    private void obtener_nombre_Dispositivo() {

        String fabricante = Build.MANUFACTURER;
        String modelo = Build.MODEL;
        nombre_Dispositivo=fabricante+" "+modelo;
        tvNombreDispositivo =(TextView) findViewById(R.id.prueba_id);//para enlazar el tv_G con el codigo
        tvNombreDispositivo.setText(nombre_Dispositivo);//para mostrar en el tv_g e modelo del celular
    }


    public void conexionBroker() {
        //para conextar al broker   //generamos un clienteMQTT
        String clientId = nombre_Dispositivo;//MqttClient.generateClientId();//noombre del celular
        client = new MqttAndroidClient(this.getApplicationContext(), MQTTHOST, clientId);
        //para agregar los parametros
        MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(USERNAME);
        options.setPassword(PASSWORD.toCharArray());
        try {

//SIFALLA  EL PROBLEMA RADICA EN CORRER EL CLIENT SIN OPTIONS Y LUEGO PONEMOS LAS OPTIONS
            IMqttToken token = client.connect(options);//intenta la conexion
            token.setActionCallback(new IMqttActionListener() {

                @Override//metodo de conectado con exito
                public void onSuccess(IMqttToken asyncActionToken) {
                    // mensaje de conectado
                    Toast.makeText(getBaseContext(), "Conectado ", Toast.LENGTH_SHORT).show();
                }
                @Override//si falla la conexion
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    // mensaje de que no se conecto
                    Toast.makeText(getBaseContext(), "NO Conectado ", Toast.LENGTH_SHORT).show();
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }


}
package my.huda.tampal.client;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import my.huda.tampal.protos.TampalServiceGrpc;
import my.huda.tampal.protos.TampalProtos.*;
import my.huda.tampal.protos.TampalServiceGrpc.*;

public class GRPCClient
{

        public static void main(String[] args)
        {
                // Create a channel to the server
                ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 6790).usePlaintext().build();
                System.out.println("Client started on port " + channel.authority());

                // Create Stub
                TampalServiceBlockingStub tampalStub = TampalServiceGrpc.newBlockingStub(channel);

                // ALL REQUESTS ARE HARDCODED. BACKEND TO BE DONE LATER
                // TODO create a user
                CreateUserRequest createUserRequest = CreateUserRequest.newBuilder().setUsername("username")
                                .setPassword("password")
                                .setEmail("email").build();
                APIResponse responseCreateUser = tampalStub.createUser(createUserRequest);
                System.out.println(responseCreateUser.getMessage());
                // TODO create a paste
                CreatePasteRequest createPasteRequest = CreatePasteRequest.newBuilder().setUserID(0)
                                .setPaste(Paste.newBuilder().setPasteID(0).setTitle("My First Paste")
                                                .setContent("Paste Content")
                                                .setDate("2022-02-02").build())
                                .build();
                APIResponse responseCreatePaste = tampalStub.createPaste(createPasteRequest);
                System.out.println(responseCreatePaste.getMessage());
                // TODO delete a paste
                DeletePasteRequest deletePasteRequest = DeletePasteRequest.newBuilder().setUserID(0).setPasteID(0).build();
                APIResponse responseDeletePaste = tampalStub.deletePaste(deletePasteRequest);
                System.out.println(responseDeletePaste.getMessage());
                // TODO get a paste
                GetPasteRequest getPasteRequest = GetPasteRequest.newBuilder().setUserID(0).setPasteID(0).build();
                Paste responseGetPaste = tampalStub.getPaste(getPasteRequest);
                System.out.println(responseGetPaste.getContent());
                // TODO get update paste
                UpdatePasteRequest updatePasteRequest = UpdatePasteRequest.newBuilder().setUserID(0).setPasteID(0)
                                .setPaste(Paste.newBuilder().setPasteID(0).setTitle("My First Paste")
                                                .setContent("Paste Content")
                                                .setDate("2022-02-02").build())
                                .build();
                Paste responseUpdatePaste = tampalStub.updatePaste(updatePasteRequest);
                System.out.println(responseUpdatePaste.getContent());
                // TODO get user
                GetUserRequest getUserRequest = GetUserRequest.newBuilder().setUserID(0).build();
                UserResponse responseGetUser = tampalStub.getUser(getUserRequest);
                System.out.println(responseGetUser.getUsername());

        }
}

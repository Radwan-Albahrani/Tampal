package my.huda.tampal.controllers;

import io.grpc.stub.StreamObserver;
import my.huda.tampal.protos.TampalProtos.*;
import my.huda.tampal.protos.TampalServiceGrpc.*;
import my.huda.tampal.service.TampalService;
import org.lognet.springboot.grpc.GRpcService;

@GRpcService
public class GrpcController extends TampalServiceImplBase
{
    private TampalService tampalService = new TampalService();

    @Override
    public void createPaste(CreatePasteRequest request, StreamObserver<APIResponse> responseObserver)
    {
        APIResponse response = tampalService.createPaste(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<APIResponse> responseObserver)
    {
        APIResponse response = tampalService.createUser(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deletePaste(DeletePasteRequest request, StreamObserver<APIResponse> responseObserver)
    {
        APIResponse response = tampalService.deletePaste(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getPaste(GetPasteRequest request, StreamObserver<Paste> responseObserver)
    {
        Paste response = tampalService.getPaste(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getUser(GetUserRequest request, StreamObserver<UserResponse> responseObserver)
    {
        UserResponse response = tampalService.getUser(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updatePaste(UpdatePasteRequest request, StreamObserver<Paste> responseObserver)
    {
        Paste response = tampalService.updatePaste(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getLatestChanges(GetLatestChangesRequest request, StreamObserver<GITResponse> responseObserver)
    {
        GITResponse response = tampalService.getLatestChanges(request);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

}

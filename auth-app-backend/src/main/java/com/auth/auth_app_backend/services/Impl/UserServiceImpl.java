package com.auth.auth_app_backend.services.Impl;

import com.auth.auth_app_backend.dtos.UserDto;
import com.auth.auth_app_backend.entity.Provider;
import com.auth.auth_app_backend.entity.User;
import com.auth.auth_app_backend.exceptions.ResourceNotFoundException;
import com.auth.auth_app_backend.helpers.UserHelper;
import com.auth.auth_app_backend.repository.RefreshTokenRepository;
import com.auth.auth_app_backend.repository.UserRepository;
import com.auth.auth_app_backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RefreshTokenRepository refreshTokenRepository;

//    @CachePut(value = "users", key = "result.id")
    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {
        if (userDto.getEmail() == null || userDto.getEmail().isBlank()){
            throw  new IllegalArgumentException("Email is Required");
        }
        if (userRepository.existsByEmail(userDto.getEmail())){
            throw new IllegalArgumentException("Email Already Exists");
        }
        // if we want to check any other thing then put here....
        User user = modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider() != null ? userDto.getProvider() : Provider.LOCAL);
        // TODO: Role assign here to user for authorization
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

//    @CachePut(value = "users", key = "#result.id")
    @Override
    public UserDto getUserByEmail(String email){
        System.out.println("First email Fetching data from database");
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with the given mail id"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId){
        User existingUser = userRepository
                .findById(UserHelper.parseUUID(userId))
                .orElseThrow(() -> new ResourceNotFoundException("User not found with the given user id"));
        if (userDto.getName() != null) existingUser.setName(userDto.getName());
        if (userDto.getImage() != null) existingUser.setImage(userDto.getImage());
        if (userDto.getProvider() != null) existingUser.setProvider(userDto.getProvider());
        if (userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
        // TODO: change password updation Logic...
        existingUser.setEnable(userDto.isEnable());

        User updatedUser = userRepository.save(existingUser);

        return modelMapper.map(updatedUser, UserDto.class);
    }

//    @CacheEvict(value = "users", key = "#userId")
    @Override
    public void deleteUser(String userId){
        System.out.println("First Fetching from DB only for testing purpose");
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository
                .findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not Found with the given id"));
        refreshTokenRepository.deleteByUserId(uId);
        userRepository.delete(user);
    }

//    @Cacheable(value = "users", key = "#userId")
    @Override
    public UserDto getUserById(String userId){
        System.out.println("Fetching from DB only for testing purpose");
        User user = userRepository
                .findById(UserHelper.parseUUID(userId)).orElseThrow(() -> new ResourceNotFoundException("User not Found with the given id"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public Iterable<UserDto> getAllUsers(){
        return userRepository
                .findAll()
                .stream().
                map(user -> modelMapper.map(user, UserDto.class))
                .toList();
    }
}

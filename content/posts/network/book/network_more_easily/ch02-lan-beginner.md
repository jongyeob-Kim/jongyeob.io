---
title: "[네트워크 쉽게, 더 쉽게] Chapter 02. LAN 초보 입문"
date: "2021-06-02T23:25"
template: "post"
draft: false
slug: "/posts/network/book/network-more-easily/ch02-lan-beginner"
category: "네트워크"
tags:
  - "네트워크", "OSI 7 Layer"
description: "컴퓨터 통신의 프로토콜은 ISO(International Organization for Standardization, 국제 표준화기구)에서 추진하는 OSI(Open System Interconnection, 개방형 시스템 간 상호 접속)로 설계 방침이 정해져 있다."
---

### 2-1. OSI 기본 참조 모델

포토토콜 : 컴퓨터 간의 통신을 위한 공통 약속

`컴퓨터 통신의 프로토콜은 ISO(International Organization for Standardization, 국제 표준화기구)에서 추진하는 OSI(Open System Interconnection, 개방형 시스템 간 상호 접속)로 설계 방침이 정해져 있다.`

각 계층의 데이터 단위

- 전송 계층 : 세그먼트
- 네트워크 계층 : 패킷
- 데이터 링크 계층 : 프레임

### 2-2. LAN

`LAN은 이더넷(Ethernet)으로 구성되는 것이 대부분이다. 이더넷은 OSI 기본 참조 모델의 물리 계층(제1계층)과 데이터 링크 계층(제2계층)에 대한 규격이다.`

LAN 카드나 네트워크 기기는 읽기 전용 메모리(ROM)를 가지고 있어, 그곳에 고유의 주소가 기록되어 있다. 이 주소를 MAC 주소라고 하며, 이더넷의 통신에는 이 MAC 주소가 사용된다.

MAC 주소는 48비트 주소다. 상위 24비트는 제조사별로 할당된 코드를 나타내고 하위 24비트는 제조사에서 관리하는 시리얼 번호가 된다.

다른 네트워크로 전달되는 통신을 실무에서는 라우팅이라고 한다.

- 각 거점에서는 `라우터`가 LAN과 WAN의 경계가 된다.
- 이더넷 통신에는 `MAC 주소`라는 단말 고유의 주소를 사용한다.
- 다른 네트워크 간의 통신을 실무에서는 `라우팅`이라고 한다.
- UTP 케이블에는 다이렉트 케이블과 크로스 케이블이 있다.
    - 다이렉트 케이블은 PC 단말과 스위치 간, 스위치와 라우터 간 접속에 사용한다.
    - 크로스 케이블은 스위치끼리나 라우터와 PC 단말을 직접 연결할 때 사용한다.

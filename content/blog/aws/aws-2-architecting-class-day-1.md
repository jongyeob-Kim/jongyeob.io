---
title: Architecting on AWS 교육. Day 1
date: "2019-07-03T00:30"
description: Architecting on AWS 교육을 다녀와서 정리한 내용. Day 1
---

본 포스팅은 `IT 인프라 설계 및 구축을 주제로 한 AWS 교육 Day1`을 수강하고, 나름대로 내용을 정리한 글입니다.

## 1. 모듈 1: 소개

### # 1. 인터넷 운영 환경

**\# 아키텍처 측면에서의 필요성**
> 2000년, Amazon.com은 새로운 쇼핑 웹 사이트 서비스가 고가용성을 확보하고 효율적으로 확장하기 위해 애쓰고 있었다.  
> 애플리케이션 및 아키텍처가 적절한 계획 없이 구축되었다. (서비스간 구분이 없었다.)  
> 데이터베이스, 컴퓨팅 및 스토리지 구성요소를 구축하는 데 많은 시간이 걸렸다.  
> 각 팀이 교류 또는 재사용에 대한 계획 없이 리소스를 구축하였다.

`이러한 문제를 해결하기 위해 아마존은 인프라 상에 고가용성, 확장성, 신뢰성이 뛰어난 아키텍처를 생성하기 위한 내부 서비스를 구축하였다. 2006년, AWS로 판메하기 시작.`

**\# 클라우드 컴퓨팅**
> 클라우드 컴퓨팅은 컴퓨팅 파워, 데이터베이스 스토리지, 애플리케이션 및 기타 IT 리소스를 필요에 따라 인터넷을 통해 제공하고 사용한 만큼만 비용을 지불하는 것을 말한다.

**\# 클라우드 컴퓨팅의 장점**
> 자본 비용을 가변 비용으로 대체  
>- 사용 방법이 결정되기도 전에 데이터 센터와 서버에 대규모의 투자를 하는 대신 컴퓨팅 리소스를 사용할 때만, 그리고 사용한 만큼의 리소스에 대해서만 비용을 지불할 수 있다.  
> 규모의 경제로 얻게 되는 이점 
>- 사용자가 늘어날수록 규모의 경제 효과 발생하여 운영 비용이 점점 줄기 때문에 가격도 계속 떨어진다.
>
> 용량 추정 불필요  
>- [Auto Scaling](https://docs.aws.amazon.com/ko_kr/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
>- Application을 배포하기 전에 용량을 결정하면 고가의 리소스를 구입하여 유휴 상태로 유지하게 되거나 한정된 용량으로 작업하게 되는 경우가 자주 발생한다. 
>- 클라우드 컴퓨팅을 사용하면 이러한 문제가 해결된다. 필요한 만큼의 리소스에 액세스하고 필요에 따라 몇 분 만에 확장 또는 축소할 수 있다.
>
> 속도 및 민첩성 개선  
>- 클라우드를 사용하면 필요에 따라 리소스를 빠르게 구동하여 수백 개, 심지어 수천 개의 서버를 몇 분 만에 배포할 수 있습니다.
>- 실험 및 개발에 소요되는 비용이 절감되고 시간이 단축되므로 조직의 민첩성이 크게 향상된다.
>
> 중요한 문제에 집중  
>- IDC 운영 및 서버를 관리하는 노력과 비용을 절감하여, 비즈니스 모델과 제품을 혁신하는 데 집중한다.
> 몇 분 만에 전 세계에 배포
>- 클라우드를 사용하면 몇 번의 클릭만으로 전 세계의 여러 물리적 위치에 애플리케이션을 손쉽게 배포할 수 있습니다.
>
> 몇 분 만에 전 세계에 배포
>- 클릭 몇 번으로 세계 곳곳의 여러 리전에 Application을 손쉽게 배포할 수 있다. 최소 비용으로 고객에게 지연 시간을 줄이면서 더 나은 사용환경 제공.

**\# Well Architected 프레임워크 (WAF)**
> 다섯가지 핵심요소  
>- 보안  
>- 안정성  
>- 비용 최적화  
>- 성능 효율성  
>- 운영 우수성  
> 
> AWS Well Architected Tool은 AWS 워크로드를 검토할 수 있도록 도와준다. Well-Architected Framework를 기반으로 한다. 이 서비스를 이용하면 워크로드의 상태를 검토하고 최신 AWS 아키텍처 모범 사례와 비교할 수 있다. But, 서울 리전에는 아직 제공되지 않는다.

**\# 보안**
> 자격 증명 기반
>- [IAM (Identity and Access Management)](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/introduction.html) 
>- 인증, 인가 처리
>
> 추적 가능성 활성화
>- [CloudWatch](https://aws.amazon.com/ko/cloudwatch/)
>- [CloudTrail](https://aws.amazon.com/ko/cloudtrail/)
>
> 모든 계층에서의 보안
>- 네트워크 트래픽에 대한 인바운드와 아웃바운드 제어 가능
>- [보안그룹](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/VPC_SecurityGroups.html)
>
> 위험 평가 및 완화 전략
>- 관제 시스템처럼 사전에 위험요소 미리 알고 싶은 경우
>- [Inspector](https://aws.amazon.com/ko/inspector/)
>- [Shield Advanced](https://docs.aws.amazon.com/ko_kr/waf/latest/developerguide/ddos-overview.html)

**\# 안정성**
> 컴퓨팅 리소스를 동적으로 확보하여 수요 충족  
>- [Auto Scaling](https://docs.aws.amazon.com/ko_kr/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
>
> 인프라 또는 서비스 장애로부터 신속하게 복구    
> 구성 오류 / 일시적인 네트워크 문제로 인한 중단 완화

**\# 비용 최적화**
> 효율성 측정  
>- `Calculator` 이용하여 추정 금액 예상해볼 수 있다.
>
> 불필요한 비용 제거  
>- 서비스를 하다보면 불필요하게 비용을 부담하는 경우가 있다. 사용하지 않는데도 서비스를 오픈한 상태에 비용 발생.
>- [Cost Explorer](https://aws.amazon.com/ko/aws-cost-management/aws-cost-explorer/) 이용하여 시간에 따른 AWS 비용과 사용량을 시각화. 사용 패턴 분석하여 보고서 형식으로 지출내역 알려준다.
>
> 관리형 서비스 사용을 고려

**\# 운영 우수성 (운영 탁월성)**
> 시스템을 실행 및 모니터링 하는 기능
>- `CloudWatch`
>- Application에 대한 성능(cpu 사용량 등)의 지표를 따로 관리하고 싶을 때, [CloudWatch Agent](https://docs.aws.amazon.com/ko_kr/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html)를 이용해서 내가 구성한 Application에 대한 성능의 지표 확인할 수 있다. [CloudWatch Logs](https://docs.aws.amazon.com/ko_kr/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)와 함께 활용.

### # 2 AWS 글로벌 인프라

**\# AWS 데이터 센터**
> 보통 단일 데이터 센터에서 수만 개의 서버를 운영
> 모든 데이터 센터는 온라인으로 연결됨

**\# 리전 (Region)**
> 논리적 개념으로, AWS 클라우드. 서비스를 제공하기 위한 인프라의 위치를 지리적 대표 도시명으로 나타낸 것이다. 
> AWS의 모든 서비스가 위치하고 있는 물리적인 장소라고 생각하면 된다. 리전 안에는 가용 영역이 여러 개 있다.  
> 리전이 여러 곳에 있는 이유는 네트워크 속도 때문이다. 멀리 떨어진 서버에 접속하면 그만큼 `경유하는 라우터 개수가 많아지므로` 느려질 수밖에 없다. 주요 지역에 리전을 위치시키고, 가까운 리전에 접속하게 해야 빠른 속도를 낼 수 있다.  
> 리전을 여러 곳에 두는 또 다른 이유는 재해에 대비하기 위해서이다. 자연 재해로 인해 한 리전이 작동불능이 되더라도 다른 리전에 데이터가 백업되어 있다면 정상적으로 서비스를 제공할 수 있기 때문이다. (`이중화`)


**\# 가용영역 (AZ, Availability Zone)**
> `데이터 센터`  
> 하나의 리전에는 두 개 이상의 가용 영역이 있다.  
> 가용영역은 물리적으로 멀리 떨어져 있다. 리전과 마차가지로 하나의 가용 영역에 문제가 발생할 경우, 다른 가용 영역이 서비스를 대체할 수 있기 때문이다.  
> AWS에서는 EC2 가상 서버를 한 리전 안에서도 최소 2개 이상의 가용 영역에 만들어서 사용할 것을 권장한다.  
> `가용성 (Availability)`
>- 서버, 네트워크, 프로그램 등이 `정상적으로 사용 가능한 정도`를 나타낸다.

**\# 에지 로케이션 (Edge Location)**
> AWS의 CDN 서비스인 [CloudFront](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)를 위한 캐시 서버들을 뜻한다.  
> CDN 서비스는 Content Delivery Network의 약자로서, 콘텐츠(이미지, 동영상 등)를 사용자들이 빠르게 받을 수 있도록 `전 세계 곳곳에 위치한 캐시 서버에 복제해주는 서비스`이다.  
> CDN 서비스와 사용자가 직접 만나는 곳이라고 하여 에지(Edge)라고 부른다.
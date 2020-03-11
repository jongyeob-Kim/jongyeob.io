---
title: "[디자인 패턴] 데코레이터 패턴 (Decorator Pattern)"
date: "2020-03-09T16:00"
template: "post"
draft: false
slug: "/posts/design-pattern/decorator-pattern/"
category: "디자인 패턴"
tags:
  - "디자인 패턴"
  - "데코레이터 패턴"
description: "데코레이터 패턴은 객체에 추가적인 행동(데코레이터)을 동적으로 적용할 수 있는 디자인 패턴이다. 데코레이터를 언제든지 새로 구현해서 새로운 행동을 추가할 수 있다. 또한, 설계상의 유연성 덕분에 런타임에 데코레이터를 마음대로 조합해서 사용할 수 있다."
socialImage: "/media/013-decorator-pattern-1.png"
---

## 1. 데코레이터 패턴 정의

<div align="center">
  <img src="/media/013-decorator-pattern-1.png" alt="데코레이터 패턴 구조" width="500px" />
</div>

데코레이터 패턴은 객체에 추가적인 행동(데코레이터)을 동적으로 적용할 수 있는 디자인 패턴이다. 데코레이터를 언제든지 새로 구현해서 새로운 행동을 추가할 수 있다. 또한, 설계상의 유연성 덕분에 런타임에 데코레이터를 마음대로 조합해서 사용할 수 있다.


## 데코레이터 패턴 적용해보기

데코레이터 패턴을 적용하지 않은 설계와 적용한 설계를 비교해볼 수 있도록 예제를 구현해보자.

**예제**
<br />
서브웨이 가게에는 Blt, Beef, Chicken 세 메뉴가 있다. 메뉴를 고르면 선택적으로 토핑을 추가할 수 있다. 토핑 종류는 다음과 같다. 햄, 베이컨, 치즈, 토마토

- 메뉴 
   - Blt - ₩4,500
   - Beef - ₩5,000
   - Chicken - ₩4,000
- 토핑
   - 햄 - ₩800
   - 베이컨 - ₩1,000
   - 치즈 - ₩800
   - 토마토 - ₩500

손님에게 주문을 받고, 그에 맞는 메뉴 및 토핑의 가격을 합산하는 프로그램을 구현해야 한다.
<br />
Blt에 햄, 베이컨 추가 => ₩6,300
<br />
Chicken에 베이컨, 치즈, 토마토 추가 => ₩6,300

### (1) 데코레이터 패턴 미적용 설계

<div align="center">
  <img src="/media/013-decorator-pattern-2.jpg" alt="미적용 설계" width="500px" />
</div>

Sandwich를 추상 클래스로 선언하고 실제 메뉴들은 이를 상속받는 구조이다. 개별 메뉴 클래스에서 cost() 메소드를 오버라이드 하면 토핑을 포함한 메뉴 금액을 계산할 수 있다. 토핑 추가 여부는 Sandwich 클래스에서 인스턴스 변수로 관리한다. 이렇게 했을 때 메뉴별로 각각 토핑 클래스를 만들지 않아도 되는 이점이 있다.

구현 코드는 다음과 같다.

```java
// Sandwich 추상 클래스
public abstract class Sandwich {
  protected String description;
  // 토핑 추가여부 
  private boolean ham;
  private boolean bacon;
  private boolean cheese;
  private boolean tomato;

  public String getDescription() {
    return description;
  }

  protected int cost() {
    int toppingCost = 0;
    if (ham) {
      toppingCost += HAM.getCost();
    }
    if (bacon) {
      toppingCost += BACON.getCost();
    }
    if (cheese) {
      toppingCost += CHEESE.getCost();
    }
    if (tomato) {
      toppingCost += TOMATO.getCost();
    }

    return toppingCost;
  }

  // setter
  ...
}

// Blt 클래스
public class Blt extends Sandwich {
  public Blt() {
    super.description = BLT.getName();
  }

  @Override
  public int cost() {
    return super.cost() + BLT.getCost();
  }
}
```

Blt 클래스에서 cost() 메소드를 오버라이드 하고, 부모 클래스에서 토핑에 대한 금액을 계산한 뒤 최종적으로 메뉴 가격을 합해 반환한다.
<br />
이 설계는 단순하기 때문에 문제점이 없다고 생각할 수 있다. 하지만 만약 `새로운 토핑이 추가된다면 어떻게 해야할까?` 또는 `특정 메뉴 선택 시 제한된 토핑만 추가할 수 있다면?` 아마 지금 구현해놓은 코드의 수정이 불가피할 것이다. 위 코드는 변경과 확장에 취약하기 때문에 유연하지 못한 설계라 할 수 있다.

이제 데코레이터 패턴을 적용해 좀 더 유연한 설계로 변경해보자.

### (2) 데코레이터 패턴 적용 설계

![적용 설계](/media/013-decorator-pattern-3.jpg)

Topping은 데코레이터(햄, 베이컨 등)의 부모 클래스이다. 또한 Topping 클래스가 Sandwich 클래스를 확장한 이유는 데코레이터 객체가 감사고 있는 객체와 `형식을 맞추기 위함`이다. 결국 메뉴와 토핑 객체는 Sandwich라는 동일한 형식을 지니고 있기 때문에 메뉴에 어떤 토핑이든 얹을 수 있게 되는 것이다.

데코레이터인 햄, 베이컨, 치즈가 Blt를 감싸고 있는 그림이다. 

<div align="center">
  <img src="/media/013-decorator-pattern-4.jpg" alt="데코레이터" width="400px" />
</div>

이제 실제 구현과 결과를 확인해보자.

```java
// Sandwich 추상 클래스
public abstract class Sandwich {
  protected String description;
  
  public String getDescription() {
    return description;
  }

  public abstract int cost();
}

// 메뉴 Blt 클래스
public class Blt extends Sandwich {
  public Blt() {
    super.description = BLT.getName();
  }

  @Override
  public int cost() {
    return BLT.getCost();
  }
}
```

```java
// Topping 추상 클래스
public abstract class Topping extends Sandwich {
  // 서브 클래스에서 구현 강제
  public abstract String getDescription();
}

// 토핑 햄 클래스
public class Ham extends Topping {
  private Sandwich sandwich;

  public Ham(Sandwich sandwich) {
    this.sandwich = sandwich;
  }

  @Override
  public String getDescription() {
    return sandwich.getDescription() + HAM.getName();
  }

  @Override
  public int cost() {
    return sandwich.cost() + HAM.getCost();
  }
}
```

햄, 베이컨, 치즈, 토마토 이외에 토핑이 추가되면 Topping 클래스를 상속하여 구현할 수 있다. 또한, 메뉴나 토핑에 변경이 일어나도 연관된 클래스를 수정하는 일은 발생하지 않는다.

실제로 데코레이터를 런타임에 어떻게 적용하는지 테스트 코드를 통해 확인해보자.

```java
public static void main(String[] args) {
  Sandwich sandwichBlt = new Blt();
  sandwichBlt = new Ham(sandwichBlt);
  sandwichBlt = new Bacon(sandwichBlt);
  sandwichBlt = new Cheese(sandwichBlt);
  
  System.out.println(sandwichBlt.getDescription() + " - ₩" 
    + NumberFormat.getInstance.format(sandwichBlt.cost()));
}
```

**결과 출력**

```shell
BLT 샌드위치, 햄, 베이컨, 치즈 - ₩7,100
```


## 💡정리하기

데코레이터 패턴을 사용하면 객체에게 `추가적인 행동을 동적으로 더할` 수 있다. 유연한 기능 확장이 가능해지므로 설계상에 이점을 지닌다.

때때로 객체에 데코레이터를 조합하는 순서가 중요한 경우가 있다. 이런 경우에는 `팩토리`나 `빌더` 패턴과 함께 사용하여 객체 생성 모듈을 따로 관리한다.

### 데코레이터 패턴을 적용했을 때 장점

- 기존 코드를 수정하지 않고도 행동(데코레이터)을 확장할 수 있다.
- 구성과 위임을 통해서 런타임에 새로운 행동(데코레이터)을 추가할 수 있다.
- 클라이언트는 데코레이터의 존재를 알 수 없기 때문에, 구체적인 형식에 의존하지 않는 코드를 구현할 수 있다.
- 변경에는 닫혀있고 확장에는 열려있는 설계를 할 수 있다.(OCP)

> 전체 코드는 [Github](https://github.com/im-yeobi/blog-sample-code/tree/master/design-pattern/decorator-pattern)을 확인해주세요.
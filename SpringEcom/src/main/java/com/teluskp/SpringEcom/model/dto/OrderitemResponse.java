package com.teluskp.SpringEcom.model.dto;

import java.math.BigDecimal;

public record OrderitemResponse(
  String productName,
  int quantity,
  BigDecimal subTotal
){}
